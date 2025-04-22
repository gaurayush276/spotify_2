import express from 'express' ; 
import { createSong ,deleteSong, createAlbum , deleteAlbum, checkAdmin} from '../controller/adminController.js';
import { protectedRoute, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router() ; 


router.use (protectedRoute , requireAdmin ) ; 

// router
// .post('/songs' ,protectedRoute , requireAdmin  , createSong )   // if user is valid and an admin only then
// .delete('/songs/:id' ,protectedRoute , requireAdmin  ,deleteSong )
// .post('/album' , protectedRoute , requireAdmin  ,createAlbum )
// .delete('/album/:id' , protectedRoute , requireAdmin  ,deleteAlbum )

router
.get("/check",  checkAdmin)
.post('/songs'  , createSong )   // if user is valid and an admin only then
.delete('/songs/:id'  ,deleteSong )
.post('/album'   ,createAlbum )
.delete('/album/:id'   ,deleteAlbum )
export default   router ; 