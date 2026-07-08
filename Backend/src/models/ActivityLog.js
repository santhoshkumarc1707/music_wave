import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({

})

const Activity  = mongoose.models. Activity|| mongoose.model("activity", ActivitySchema);

export default Activity;