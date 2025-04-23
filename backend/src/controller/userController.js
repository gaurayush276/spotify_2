import { User } from "../models/userSchema.js";

export const getAllUsers =  (req, res)=>{
    // to avoid yourself in the list if users 
    const currentUser = req.auth.userId ; 
    const users = User.find({clerkId :{ $ne:currentUser} }) ; 
    res.status(200).json(users) ;
}
// export const addUser = ( req, res) =>{
//     const {data} = req.body() ; 

// }