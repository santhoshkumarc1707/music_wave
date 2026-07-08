import mongoose from "mongoose";

const  SubscriptionSchema = new mongoose.Schema({

})

const Subscription = mongoose.models.Subscription|| mongoose.model("subscription",SubscriptionSchema);

export default Subscription;