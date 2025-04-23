import { clerkClient } from "@clerk/express";

export const protectedRoute = async(req , res, next)=>{
    if( !req.auth?.userId) {
        // form clerk  req.auth.userId
        res.status(401).json( { status : "No member found "}) ;
        return  ; 
    }

    next() ; 
}

export const requireAdmin = async(req , res, next)=>{
    // https://clerk.com/docs/references/express/overview#clerk-client
        const currentUser = await clerkClient.users.getUser(req.auth.userId) ;
        // console.log(currentUser) ; 
        const isAdmin = process.env.ADMIN_EMAIL  === currentUser.primaryEmailAddress?.emailAddress ;
        // from clerk 
        if ( !isAdmin )
        {
            console.log("You are not an admin , Please get permission from Ayush");
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next() ; 
}