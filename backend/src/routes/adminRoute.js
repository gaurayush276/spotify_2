import express from 'express' ; 

const router = express.Router() ; 

router
.get('/' , (req, res)=>{
    res.status(201).json({status :"admin Router"}) ; 
    
})


export default   router ; 