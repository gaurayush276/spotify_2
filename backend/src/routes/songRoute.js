import express from 'express' ; 
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getSongById, getTrendingSongs } from '../controller/songController.js';
import { protectedRoute, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router() ; 

router
.get('/',protectedRoute, requireAdmin ,  getAllSongs) 
.get('/:songid',protectedRoute, requireAdmin ,   getSongById) 
.get('/featured',getFeaturedSongs) 
.get('/made-for-you',getMadeForYouSongs) 
.get('/trending',getTrendingSongs) 


export default   router ;  