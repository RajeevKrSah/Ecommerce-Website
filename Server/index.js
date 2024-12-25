import 'dotenv/config'
import express from "express"
import connectDB from './db/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
 
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// Database connection 
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connectin failed!!!",err);
})


app.get('/', (req,res)=>{
    res.send("Hello Luxora")
})


