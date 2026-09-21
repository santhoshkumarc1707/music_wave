import express from "express"

const playlistSongRouter=express.Router()
// POST   /api/playlists/:id/songs
// DELETE /api/playlists/:id/songs/:songId
// GET    /api/playlists/:id/songs

playlistSongRouter.get("/:id/songs");
playlistSongRouter.delete("/:id/songs/:songId");
playlistSongRouter.post("/:id/songs")

export default playlistSongRouter;