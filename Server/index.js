const express = require('express')
const connectDB = require('./db/index.js')

require('dotenv').config()
const app = express()

PORT = process.env.PORT || 4000

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

