import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"


// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        //Check Credits
        if (req.user.credits < 1) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" })
        }

        const { chatId, prompt } = req.body

        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({ role: "User", content: prompt, timestamp: Date.now(), isImage: false })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }
        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })
        const updatedUser = await User.findById(userId).select('credits')

        res.json({ success: true, reply, credits: updatedUser?.credits ?? req.user.credits })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        // Check credits
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" })
        }

        const { prompt, chatId, isPublished } = req.body

        // Find chat
        const chat = await Chat.findOne({ userId, _id: chatId })
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" })
        }

        // Push user message
        chat.messages.push({ role: "User", content: prompt, timestamp: Date.now(), isImage: false })

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        // Construct ImageKit AI generation URL
        const generateImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`

        // Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generateImageUrl, { responseType: "arraybuffer" })

        // Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`

        // Upload to ImageKit Media Library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        })

        const reply = { role: "assistant", content: uploadResponse.url, timestamp: Date.now(), isImage: true, isPublished }

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })
        const updatedUser = await User.findById(userId).select('credits')

        res.json({ success: true, reply, credits: updatedUser?.credits ?? req.user.credits })

    } catch (error) {
        console.error('Image message error:', error.message)
        console.error('Full error details:', error)
        res.json({ success: false, message: error.message || 'Failed to generate image' })
        res.json({ success: false, message: error.message })
    }
}