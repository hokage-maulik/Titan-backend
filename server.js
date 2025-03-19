

const express=require("express")
const db=require("./config/db")
const cors=require("cors")
const bodyparser=require("body-parser")
const router = require("./routes/useRoute")
const prouter = require("./routes/productRoute")
const crouter = require("./routes/categoryRoute")
const cartrouter = require("./routes/cartRoute")

const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())
app.use("/user",router)
app.use("/product",prouter)
app.use("/category",crouter)
app.use("/cart",cartrouter)



app.listen(9000,()=>{
    console.log("server is running on port 9000")
})