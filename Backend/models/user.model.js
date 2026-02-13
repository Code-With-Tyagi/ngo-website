import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"]
    }
})

const User=mongoose.model("User",userSchema);
export default User;