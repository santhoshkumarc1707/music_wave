import mongoose from "mongoose";

const PlaylistSongSchema = new mongoose.Schema(
{
    playlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Playlist",
        required:true
    },

    song:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song",
        required:true
    },

    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    order:{
        type:Number,
        default:1
    }
},
{
    timestamps:true
});

PlaylistSongSchema.index({
    playlist:1,
    song:1
},
{
    unique:true
});

export default mongoose.models.PlaylistSong ||
mongoose.model("PlaylistSong",PlaylistSongSchema);