import express from "express";
import Song from "../models/Song.js";
import Album from "../models/Album.js";
import auth from "../middleware/auth.js";

const SearchRouter = express.Router();

SearchRouter.get("/", auth, async (req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const songs = await Song.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const Album = await Album.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const result = { songs, Album };
        res.status(200).send(result);
    } else {
        res.status(200).send({});
    }
});

export default SearchRouter;

