import { Album } from "../models/albumSchema.js"

export const getAllAlbums =async (req , res)=>{
    const data =await Album.find() ;
    res.status(200).json(data) ; 
}


//^ without populate 
// songs: [
//     "661fcff02442cbfef8444321",
//     "661fd0022442cbfef8446789"
//   ]
  
// ^ with populate 
// songs: [
//     {
//       _id: "661fcff02442cbfef8444321",
//       title: "Song 1",
//       duration: "3:30",
//       ...
//     },
//     {
//       _id: "661fd0022442cbfef8446789",
//       title: "Song 2",
//       duration: "4:20",
//       ...
//     }
//   ]

//  if i dont use the populate then  i need to make another api call to get the all songs after making the album api call 
export const getAlbumById = async(req,res)=>{
    const {id} = req.params ; 
    //  ? without populate it will only show the id and with that it will get all the nesetd data in the songs  
    const data = await Album.findById(id).populate("songs") ; 
    if ( !data )
        return res.json({status : "No Album found"}) ;

    res.status(200).json(data) ; 
}



// * over all if i wrap up i made an schema like all the songs are there in album so when i call a specific album it will give all the song attached with it using the populate otherwise it give give only id's of the song then i have to make different many call for all the songs that are related to album which is not a good way 