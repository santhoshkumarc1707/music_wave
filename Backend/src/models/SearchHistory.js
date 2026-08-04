import mongoose from "mongoose";

const SearchHistorySchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    keyword:{
        type:String,
        required:true
    },

    searchType:{
        type:String,
        enum:[
            "Song",
            "Artist",
            "Album",
            "Playlist"
        ]
    }
},
{
    timestamps:true
});

export default mongoose.models.SearchHistory ||
mongoose.model("SearchHistory",SearchHistorySchema);