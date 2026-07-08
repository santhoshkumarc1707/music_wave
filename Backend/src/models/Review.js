import mongoose from "mongoose";

const  ReviewSchema = new mongoose.Schema({

})

const Review  = mongoose.models.Review|| mongoose.model("Review",ReviewSchema);

export default Review;