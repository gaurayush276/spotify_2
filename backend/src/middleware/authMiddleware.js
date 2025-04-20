import { clerkClient } from "@clerk/express";

export const protectedRoute = async(req , res, next)=>{
    if( req.auth.userID) {
        // form clerk  req.auth.userID
        alert("Unauthorized ,no member found") ;
        res.status(401).json( { status : "No member found "}) ;
        return  ; 
    }

    next() ; 
}

export const requireAdmin = async(req , res, next)=>{
    // https://clerk.com/docs/references/express/overview#clerk-client
        const currentUser = await clerkClient.users.getUser(req.auth.userID) ;
        console.log(currentUser) ; 
        const isAdmin = process.env.ADMIN_EMAIL  === currentUser.primaryEmailAddress?.emailAddress ;
        // from clerk 
        if ( !isAdmin )
        {
            alert("You are not an admin , Please get permission from Ayush");
            return ; 
        }

        next() ; 
}