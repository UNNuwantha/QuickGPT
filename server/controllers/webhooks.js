import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processSession = async (session, response) => {
    if (!session?.metadata) {
        return response.json({ received: true, message: "Webhook received but session metadata missing" })
    }

    const { transactionId, appId } = session.metadata;

    if (appId !== 'quickgpt') {
        return response.json({ received: true, message: "Ignored event: Invalid app" })
    }

    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false })
    if (!transaction) {
        return response.json({ received: true, message: "Transaction not found or already processed" })
    }

    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })
    transaction.isPaid = true;
    await transaction.save();
    return response.json({ received: true })
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

                const session = sessionList.data[0];
                if (!session) {
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