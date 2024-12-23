import express from "express"

import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))



app.get('/', (req,res)=>{
    res.send("Hello Luxora")
})

app.get("/api/v1",(req,res)=>{
    res.send("This is from Luxora")
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    
})

