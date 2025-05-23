import express from 'express'  ;
import dotenv from 'dotenv'
import adminRoutes from './routes/adminRoute.js' ;
import userRoutes from './routes/userRoute.js' ;
import authRoutes from './routes/authRoute.js' ;
import songsRoutes from './routes/songRoute.js' ;
import albumRoutes from './routes/albumRoute.js' ;
import statsRoutes from './routes/statsRoute.js' ;
import mongoose from 'mongoose' ; 
import { clerkMiddleware } from '@clerk/express'
import fileupload from 'express-fileupload';
import path from "path" ;


async function database () {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(e => console.log("MongoDb Connected")).catch( e => ( console.log(e))) ; 
}


dotenv.config() ; 
const app = express() ; 
const port = process.env.PORT ;
// path.resolve makes the directory path string (not the actual directory).
const __dirname = path.resolve() ; 
//   ^ The clerkMiddleware() function checks the request's cookies and headers for a session JWT and if found, attaches the Auth object to the request object under the auth key.^
// Pass no parameters
app.use(clerkMiddleware())
app.use(
    // to make the temp file that stores the cloudinary data like iamges and audios 
    fileupload(
    {
        useTempFiles: true , 
        tempFileDir : path.join(__dirname , "tmp") ,
        createParentPath :true , 
        limits : 10 * 1024 * 1024   // ? 10 mb 
    }
)) ; 
app.use(express.json()) ; 
app.use('/api/users' , userRoutes) ; 
app.use('/api/auth' , authRoutes) ; 
app.use('/api/admin' , adminRoutes) ;  
app.use('/api/songs' , songsRoutes) ; 
app.use('/api/albums' , albumRoutes) ; 
app.use('/api/stats' , statsRoutes) ; 
app.get("/" , (req, res) =>{
    res.json({ status : "fine"}) ; 
})

app.listen( port , () => {
    console.log(`server Started ${port}`) ; 
    database() ; 
})
 