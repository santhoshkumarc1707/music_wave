import express from "express"
import { createSubscription, deleteSubscription, getMySubscription, getSubscriptions, updateSubscription } from "../controllers/subscriptionController.js"

const subscriptionRouter=express.Router()

subscriptionRouter.get("/",getSubscriptions)
subscriptionRouter.get("/me",getMySubscription)
subscriptionRouter.post("/",createSubscription)
subscriptionRouter.put("/:id",updateSubscription)
subscriptionRouter.delete("/:id",deleteSubscription)

export default subscriptionRouter;