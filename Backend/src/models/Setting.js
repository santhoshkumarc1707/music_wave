import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    language:{
        type:String,
        default:"English"
    },

    theme:{
        type:String,
        enum:[
            "Light",
            "Dark",
            "System"
        ],
        default:"Dark"
    },

    audioQuality:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Lossless"
        ],
        default:"High"
    },

    autoplay:{
        type:Boolean,
        default:true
    },

    notifications:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

export default mongoose.models.Setting ||
mongoose.model("Setting",SettingSchema);