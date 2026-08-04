import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true
    },

    startDate:{
        type:Date,
        default:Date.now
    },

    endDate:Date,

    amount:Number,

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed","Refunded"],
        default:"Pending"
    },

    status:{
        type:String,
        enum:["Active","Expired","Cancelled"],
        default:"Active"
    },

    autoRenew:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

export default mongoose.models.Subscription ||
mongoose.model("Subscription",SubscriptionSchema);