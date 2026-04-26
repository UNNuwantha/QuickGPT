import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'

const app = express()

await connectDB()

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res)=> res.send('Serever is Live!'))
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})