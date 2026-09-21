import express from "express";

import {
  createArtist,
  deleteArtist,
  getArtists,
  getArtistById,
  getArtistAlbums,
  getArtistSongs,
  updateArtist
} from "../controllers/artistController.js";

const ArtistRouter = express.Router();

// GET    /api/artists
ArtistRouter.get("/", getArtists);

// POST   /api/artists
ArtistRouter.post("/", createArtist);

// PUT    /api/artists/:id
ArtistRouter.put("/:id", updateArtist);

// DELETE /api/artists/:id
ArtistRouter.delete("/:id", deleteArtist);

// GET    /api/artists/:id/songs
ArtistRouter.get("/:id/songs", getArtistSongs);

// GET    /api/artists/:id/albums
ArtistRouter.get("/:id/albums", getArtistAlbums);

// GET    /api/artists/:id
ArtistRouter.get("/:id", getArtistById);

export default ArtistRouter;