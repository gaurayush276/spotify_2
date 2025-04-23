import { Song } from '../models/songSchema.js';
import { User } from '../models/userSchema.js';
import { Album } from '../models/albumSchema.js';

export const getStats  = async(req, res)=>{

        // const totalSongs = await Song.countDocuments() ; 
        // const totalUsers = await User.countDocuments() ; 
        // const totalAlbums = await Album.countDocuments() ; 
    //   ? better practice 
    // all  fetching at once side by side 
        const [totalSongs,totalUsers , totalAlbums , uniqueArtists ] = await Promise.all([
            Song.countDocuments() ,
            Album.countDocuments() ,
            User.countDocuments(),
            // so unioWith is merging  the album artist with song and then we are grouping it according to the artist id and then  counting it 
            Song.aggregate([
                {
                    // {
                    //     $ unionWith: {
                    //       coll: "albums",
                    //       pipeline: [
                    //         { $ project: { artist: "$creator" } } // rename creator -> artist
                    //       ]
                    //     }
                    //   }
                    $unionWith :{
                        coll : "albums" ,
                        // no transformation needed so empty 
                        pipeline :[] ,
                    }
                }, {
                    $group : {
                        _id :"$artist",
                    }
                }
                    , {
                        $count :"count" 
                    }
                
            ])
        ])
     }
