import express from 'express' ; 
import { getAdmin } from '../controller/adminController.js';
import { protectedRoute, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router() ; 

router
.get('/' ,protectedRoute , requireAdmin  , createSong ) ;  // if user is valid and an admin only then


export default   router ; 