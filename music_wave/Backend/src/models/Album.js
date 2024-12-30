import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    bgColour: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // songs: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'song',
         
    //     }
    //   ]
})

const Album = mongoose.models.album || mongoose.model("album", albumSchema);

export default Album;