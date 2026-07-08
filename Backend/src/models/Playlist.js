import mongoose from "mongoose";

const  PlaylistSchema = new mongoose.Schema({

})

const Playlist  = mongoose.models.Playlist|| mongoose.model("Playlist",PlaylistSchema);

export default Playlist;