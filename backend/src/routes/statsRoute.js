import express from 'express' ; 

import { protectedRoute, requireAdmin } from '../middleware/authMiddleware.js';
import { getStats } from '../controller/statsController.js';

const router = express.Router() ; 

router
.get('/' , protectedRoute, requireAdmin,    getStats) 


export default   router ; 