import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    subscription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription"
    },

    amount:{
        type:Number,
        required:true
    },

    currency:{
        type:String,
        default:"INR"
    },

    paymentMethod:{
        type:String,
        enum:[
            "UPI",
            "Card",
            "NetBanking",
            "Wallet",
            "PayPal"
        ]
    },

    transactionId:String,

    paymentGateway:String,

    paymentStatus:{
        type:String,
        enum:["Pending","Success","Failed","Refunded"],
        default:"Pending"
    }
},
{
    timestamps:true
});

export default mongoose.models.Payment ||
mongoose.model("Payment",PaymentSchema);