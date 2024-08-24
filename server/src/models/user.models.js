import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trime:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trime:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trime:true
    },
    password:{
        type:String,
        required:true,
        trime:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})


export const User = mongoose.model("User",UserSchema)
