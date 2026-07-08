import mongoose from "mongoose";

const  PaymentSchema = new mongoose.Schema({

})

const Payment  = mongoose.models.Payment|| mongoose.model("Payment",PaymentSchema);

export default Payment;