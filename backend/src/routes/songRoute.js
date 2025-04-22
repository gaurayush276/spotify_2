import express from 'express' ; 
import { getAllSongs, getSongById } from '../controller/songController';
import { protectedRoute, requireAdmin } from '../middleware/authMiddleware';

const router = express.Router() ; 

router
.get('/',protectedRoute, requireAdmin ,  getAllSongs) 
.get('/featured',getFeaturedSongs) 
.get('/made-for-you',getMadeForYouSongs) 
.get('/trending',getTrendingSongs) 
.get('/:songid',protectedRoute, requireAdmin ,   getSongById) 


export default   router ;  