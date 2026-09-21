import express from "express"
import { getActivity, getActivitybyId } from "../controllers/activityLogController.js";


const activityRouter=express.Router()
activityRouter.get("/",getActivity);
activityRouter.get("/:id",getActivitybyId);

export default activityRouter;