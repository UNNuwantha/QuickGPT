import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processSession = async (session, response) => {
    const metadata = session?.metadata || session?.payment_intent?.metadata;

    if (!metadata) {
        console.error('Webhook processing failed: metadata missing', { session })
        return response.status(400).json({ received: true, message: "Webhook received but session metadata missing" })
    }

    const { transactionId, appId } = metadata;

    if (appId !== 'quickgpt') {
        return response.json({ received: true, message: "Ignored event: Invalid app" })
    }

    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false })
    if (!transaction) {
        console.warn('Transaction not found or already processed', { transactionId })
        return response.json({ received: true, message: "Transaction not found or already processed" })
    }

    const userUpdate = await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })
    if (!userUpdate.matchedCount) {
        console.error('User not found for transaction', { transactionId, userId: transaction.userId })
        return response.status(500).json({ received: true, message: "User not found for transaction" })
    }

    transaction.isPaid = true;
    await transaction.save();
    console.log('Processed transaction successfully', { transactionId, userId: transaction.userId })
};

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers["stripe-signature"]

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                return await processSession(session, response);
            }

            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                })

                const session = sessionList.data.find((s) => s.metadata?.transactionId) || sessionList.data[0];
                if (!session) {
                    console.warn('No checkout session found for payment intent', { paymentIntentId: paymentIntent.id });
                    return response.json({ received: true, message: "No checkout session found for payment intent" })
                }

                return await processSession(session, response);
            }

            default:
                console.log("Unhandled event type:", event.type)
                return response.json({ received: true, message: `Ignored event type: ${event.type}` })
        }
    } catch (error) {
        console.error("Webhook processing error: ", error)
        response.status(500).send("Internal Server Error")
    }
}