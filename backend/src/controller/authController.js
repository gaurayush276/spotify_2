import { User } from "../models/userSchema.js";

export const authCallback = async ( req , res) =>{
    const { id , firstName , lastName , imageUrl } = await req.body ; 
    const data = await User.findOne({clerkId : _id}) ;
    if ( data ){
        alert("Already a member Try loging in") ;
        return ; 
    }
    const user = new User (req.body) ; 
    user.save() ;
    res.status(201).json({user}) ;
}