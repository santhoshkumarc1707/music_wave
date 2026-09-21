import express from "express"
import { search } from "../controllers/searchHistoryController.js";
const searchRouter=express.Router();
searchRouter.get("/",search)

export default searchRouter;