import express from 'express' ; 

const router = express.Router() ; 

router
.get('/' , (req, res)=>{
    res.status(201).json({status :"user Router"}) ; 
    console.log("we are here") ; 
})


export default   router ; 