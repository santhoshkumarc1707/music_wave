import express from "express"
import { createReview, deleteReview, getReviewsBySong, updateReview } from "../controllers/reviewController.js";

const ReviewRouter=express.Router()
ReviewRouter.put("/:id",updateReview);
ReviewRouter.get("/:songId",getReviewsBySong);
ReviewRouter.post("/",createReview);
ReviewRouter.delete("/:id",deleteReview);
export default ReviewRouter;