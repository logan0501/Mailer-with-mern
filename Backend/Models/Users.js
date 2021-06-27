const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
mongoose.model("users",userSchema)