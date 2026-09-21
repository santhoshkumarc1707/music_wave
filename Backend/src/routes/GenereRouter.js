import express from "express";
import { createGenre, deleteGenre, getGenreById, getGenres, updateGenre } from "../controllers/genreController.js";

const genreRouter = express.Router();

// GET    /api/genres
genreRouter.get("/",getGenres);

// GET    /api/genres/:id
genreRouter.get("/:id",getGenreById);

// POST   /api/genres
genreRouter.post("/",createGenre);

// PUT    /api/genres/:id
genreRouter.put("/:id",updateGenre);

// DELETE /api/genres/:id
genreRouter.delete("/:id",deleteGenre);

// GET    /api/genres/:id/songs
// genreRouter.get("/:id/songs",);

export default genreRouter;