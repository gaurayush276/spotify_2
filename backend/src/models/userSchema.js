import { Schema } from "mongoose";
import mongoose from "mongoose";


const userSchema = new Schema({
    fullName : {type : String , required : true } , 
    imageUrl : {
        type : String , required: true
    } , 
    clerkId : { type :String , unique : true , required : true }
},
    {timestamps: true}
)

export const User = mongoose.model("User" , userSchema ) ; 