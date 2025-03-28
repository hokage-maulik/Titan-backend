
const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

const useModel=new mongoose.model("user",userSchema)

module.exports=useModel