import mongoose from "mongoose";

const  planSchema = new mongoose.Schema({

})

const plan  = mongoose.models.plan|| mongoose.model("plan",planSchema);

export default plan;