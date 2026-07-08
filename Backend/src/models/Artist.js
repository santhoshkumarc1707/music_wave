import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({

})

const Artist = mongoose.models.Artist || mongoose.model("artist", artistSchema);

export default Artist;