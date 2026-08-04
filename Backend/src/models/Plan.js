import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true
    },

    description:String,

    price:{
        type:Number,
        required:true
    },

    duration:{
        type:Number, // Days
        required:true
    },

    features:[String],

    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

const Plan =
mongoose.models.Plan ||
mongoose.model("Plan",PlanSchema);

export default Plan;