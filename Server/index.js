import 'dotenv/config'
import express from "express"
import connectDB from './db/index.js'
const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

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

app.get("/api/v1",(req,res)=>{
    res.send("This is from Luxora")
})

