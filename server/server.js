import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res)=> res.send('Serever is Live!'))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})