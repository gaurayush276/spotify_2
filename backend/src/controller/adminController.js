import { Song } from "../models/songSchema.js";
import { Album } from "../models/albumSchema.js";
import cloudinary from "../LIB/cloudinary.js";

// the express-fileupload will create file named tmp 
// in the audio file it will be there as completer file with the path of tmp file 

// then this file will be passed as parameter in the function 
async function uploadToCloudinary(file) {
    // now we will give parameters in the upload path and type of file 
    try {

        const result = await cloudinary.uploader.upload(file.tempFilePath , {
            resource_type: "auto"
        })
        return result.secure_url ; 
    }
    catch(e) {
        console.log("error in cloudinary upload") ;

    }
}

export const createSong =async ( req , res) =>{
    // req.files instead of req.body  because i am using fileupload 
         if ( !req.files || !req.files.audioFile || !req.files.imageFile){
            alert( "Please upload all the files") ; 
            return res.status(401).json({ Message : "Please upload all the files"}) ; }

            const { title ,artist , duration, albumId} = req.body; 
            const audioFile = req.files.audioFile ; 
            const imageFile = req.files.imageFile ; 

            const audioUrl = await uploadToCloudinary(audioFile) ; 
            const imageUrl = await uploadToCloudinary(imageFile) ;

            const song = new Song (req.body) ; 
            await song.save() ;
            if ( albumId){
                //  ? go to the album and add the song 
                await Album.findByIdAndUpdate(albumId, {
                    $push: { songs: song._id }});
                 } 

}

export const deleteSong =async (req, res)=>{
    const {id} = req.params ;
    const song = await Song.findById(id) ; 
    // ^ if the song belongs to any album then delete the song form the album too 
// ? if we are deleting a song then we are deleteing this from one set of album 
//    ! if (song.albumId) {
//       !  await Album.findByIdAndDelete(song.albumId);
//       }
//      ! That would delete the entire album document 
      if ( song.albumId) {
        // ? go the perticular album and then delete the specific song
        await Album.findByIdAndUpdate( song.albumId ,
            {
                $pull :{ songs : song._id}
            }, {new : true }
        )
      }
      await Song.findByIdAndDelete(id) ; 
    res.status(200).json({status : "song deleted successfully"}) ; 
}


export const createAlbum = async(req ,res)=>{
        const {title ,artist , releaseYear } = req.body ; 
        const imageFile = req.files.imageFile ; 

        const imageUrl  =await uploadToCloudinary(imageFile) ; 
        const album = new Album({
            title : title , artist : artist , releaseYear: releaseYear , imageUrl: imageUrl
        }) ; 
        await album.save() ; 

        res.status(201).json({status : "Album created"}) ; 

}

export const deleteAlbum = async(req , res)=>{
    const {id}= req.params ;  
    //  ? if we are deleting an album then we have to delete it from every song list
        await Song.deleteMany({albumId : id})
        await Album.findByIdAndDelete(id) ;

        res.status(200).json({stats :"Album deleted"}) ;
    }

    
export const checkAdmin = (req, res)=>{
    // if we are here that means we already passed the requireAdmin component 
    res.json({status:true}) ;
}