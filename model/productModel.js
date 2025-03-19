
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,ref:"category"

    }
})

const productModel=new mongoose.model("product",productSchema)

module.exports=productModel