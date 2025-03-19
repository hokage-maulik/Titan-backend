

const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    categoryname:{
        type:String,
    },
    categoryimage:{
        type:String
    }

  
})

const categoryModel=new mongoose.model("category",categorySchema)

module.exports=categoryModel