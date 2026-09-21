import express from "express"
import { createplan, deleteplan, getplan, getPlanById, updatePlan } from "../controllers/planController.js";

const planRouter=express.Router()
planRouter.get("/",getplan)
planRouter.post("/",createplan)
planRouter.put("/:id",updatePlan);
planRouter.get("/:id",getPlanById);
planRouter.delete(":id",deleteplan);

export default planRouter;