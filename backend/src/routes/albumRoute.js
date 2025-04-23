import express from 'express' ; 
import { getAlbumById, getAllAlbums } from '../controller/albumController.js';

const router = express.Router() ; 

router
.get('/' ,getAllAlbums ) 
.get('/' ,getAlbumById ) 


export default   router ; 