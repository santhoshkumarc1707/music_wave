import { addAlbum, listAlbum, removeAlbum } from "../controllers/albumController.js";
import express from "express";
import upload from "../middleware/multer.js";
import admin from "../middleware/admin.js";


const albumRouter = express.Router();

albumRouter.post('/add',admin, upload.single('image'), addAlbum);
albumRouter.get('/list',admin, listAlbum);
albumRouter.delete('/remove/:id',admin, removeAlbum)


export default albumRouter;