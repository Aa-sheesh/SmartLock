import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    role:{
        type:String,
        default:'user'
    },

},{timestamps:true});

const User=mongoose.model("User",userSchema);   
export default User;