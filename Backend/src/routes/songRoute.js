import { addSong, getLikedSongs, getSongById, likeSong, listSong, removeSong, updateSong } from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multer.js";
// import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

// GET    /api/songs
// GET    /api/songs/:id
// POST   /api/songs
// PUT    /api/songs/:id
// DELETE /api/songs/:id

// GET    /api/songs/trending
// GET    /api/songs/latest
// GET    /api/songs/recommended
// GET    /api/songs/search



const songRouter = express.Router();

songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/list', listSong);
songRouter.get('/list/:id',);
songRouter.get("/trending");
songRouter.get("/latest");
songRouter.get("/recommended");
songRouter.get("/search");
songRouter.delete('/remove/:id', removeSong);
songRouter.get('/getSongById/:id', validateObjectId, getSongById);
songRouter.put('/updateSong/:id', validateObjectId, updateSong);
songRouter.get('/likeSong/:id', likeSong);
songRouter.get('/ getLikedSongs', getLikedSongs);
export default songRouter;