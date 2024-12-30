import { addSong, getLikedSongs, getSongById, likeSong, listSong, removeSong, updateSong } from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multer.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const songRouter = express.Router();

songRouter.post('/add', admin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/list', listSong);
songRouter.delete('/remove/:id', removeSong);
songRouter.get('/getSongById/:id', validateObjectId, getSongById);
songRouter.put('/updateSong/:id', validateObjectId, updateSong);
songRouter.get('/likeSong/:id', likeSong);
songRouter.get('/ getLikedSongs', getLikedSongs);
export default songRouter;