import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    description:String,

    image:String,

    visibility:{
        type:String,
        enum:["Public","Private"],
        default:"Private"
    },

    totalSongs:{
        type:Number,
        default:0
    },

    likes:{
        type:Number,
        default:0
    },

    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

export default mongoose.models.Playlist ||
mongoose.model("Playlist",PlaylistSchema);