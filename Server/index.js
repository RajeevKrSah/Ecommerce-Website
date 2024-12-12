const express = require('express')
const connectDB = require('./db/index.js')

require('dotenv').config()
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const app = express()

PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)

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

