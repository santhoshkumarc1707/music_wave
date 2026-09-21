import { addAlbum, listAlbum, removeAlbum } from "../controllers/albumController.js";
import express from "express";
import upload from "../middleware/multer.js";
// import admin from "../middleware/admin.js";

// GET    /api/albums/:id
// POST   /api/albums
// PUT    /api/albums/:id
// DELETE /api/albums/:id
// GET    /api/albums/:id/songs

const albumRouter = express.Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.get("/list/:id");
albumRouter.get("/:id/songs")
albumRouter.delete('/remove/:id', removeAlbum)


export default albumRouter;