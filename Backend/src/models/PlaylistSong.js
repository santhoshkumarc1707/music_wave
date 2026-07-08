import mongoose from "mongoose";

const  PlaylistSongSchema = new mongoose.Schema({

})

const PlaylistSong  = mongoose.models.PlaylistSong|| mongoose.model("PlaylistSong",PlaylistSongSchema);

export default PlaylistSong;