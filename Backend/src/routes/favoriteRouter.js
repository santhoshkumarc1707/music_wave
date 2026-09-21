import express from "express"
import { addFavorite, deletefavorite, getfavorite, getFavoriteByUser } from "../controllers/favoriteController.js";

const favoriteRouter=express.Router()
favoriteRouter.get("/",getfavorite);
favoriteRouter.get("/:id",getFavoriteByUser);
favoriteRouter.post("/",addFavorite);
favoriteRouter.delete("/:Id",deletefavorite);
export default favoriteRouter;