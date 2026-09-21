import express from "express"
import { getSettings, updatesetting } from "../controllers/settingController.js";

const settingRouter=express.Router()

settingRouter.get("/",getSettings);
settingRouter.put("/",updatesetting);

export default settingRouter;