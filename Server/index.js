import 'dotenv/config'
import express from "express"
import connectDB from './db/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'

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


app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)

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


