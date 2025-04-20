import { User } from "../models/userSchema.js";

export const getAdmin = (req, res) =>{
    const data = req.body ; 
    const users = User.find() ; 
    console.log(users) 
    // res.status(200).send({ data : users}) ; 
}


export const createSong = ( req , res) =>{
    
}
