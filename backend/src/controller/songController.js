import { Song } from "../models/songSchema"

export const getAllSongs =async (req, res)=>{
    // Mongoose will automatically add createdAt and updatedAt fields,

    const data = await Song.find().sort({createdAt : -1 }) ; 
    // that how i will get all the data in descending order 
    res.status(200).json(data) ; 

}

export const getSongById = (req, res)=>{
    const {id} = req.params ; 
    const song = Song.find(id) ; 

    res.json(song) ; 
}


// to get the random songs 
export const getFeaturedSongs =(req, res)=>{
    // $sample It randomly selects the specified number of documents from the collection.
    const song = Song.aggregate([
        {  $sample : { size :6} ,
} , 
    //   $ project	Includes, excludes, or reshapes fields in documents.
    {$project : {
        _id : 1 ,
        title :1 ,
        imageUrl : 1 ,
        audioUrl:1 ,
        artist : 1
    }}

    ])
}

//  to handle the songs on the basis of your history
export const getMadeForYouSongs =(req, res)=>{
    // $sample It randomly selects the specified number of documents from the collection.
    const song = Song.aggregate([
        {  $sample : { size : 10} ,
} , 
    //   $ project	Includes, excludes, or reshapes fields in documents.
    {$project : {
        _id : 1 ,
        title :1 ,
        imageUrl : 1 ,
        audioUrl:1 ,
        artist : 1
    }}

    ])
}
