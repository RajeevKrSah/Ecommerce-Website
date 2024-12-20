const express = require('express')
const connectDB = require('./db/index.js')
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const productRouter = require('./routes/product.js')
const cartRouter = require('./routes/cart.js')
const app = express()

PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)


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
    res.send("Hello guys")
})

