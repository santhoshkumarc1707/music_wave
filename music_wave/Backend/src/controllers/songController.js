import { v2 as cloudinary } from "cloudinary"
import Song from "../models/Song.js";

const addSong = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = Song(songData);
        await song.save();

        res.status(201).json({ success: true, message: "Song Added" })


    } catch (error) {
        console.log('Failed at addSong, ', error);
        res.status(400).json({ success: false, message: "Song Add Failed" })
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await Song.find({});
        res.status(201).json({ success: true, songs: allSongs });
    } catch (error) {
        console.log('Failed at listSong, ', error);
        res.status(400).json({ success: false, message: "Song List Failed" })
    }
}

const removeSong = async (req, res) => {
    try {
        const { id } = req.params;
        await Song.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Song removed success" });
    } catch (error) {
        console.log('Failed at removeSong, ', error);
        res.status(400).json({ success: false, message: "Song removed Failed" })
    }
}
const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: "Song not found" });
        res.status(200).json({ success: true, data: song });
    } catch (error) {
        console.error("Error fetching song by ID:", error);
        res.status(500).json({ success: false, message: "Failed to fetch song", error: error.message });
    }
};

const updateSong = async (req, res) => {
    try {
        const { name, artist } = req.body;
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { name, artist },
            { new: true }
        );

        if (!song) return res.status(404).json({ success: false, message: "Song not found" });

        res.status(200).json({ success: true, message: "Song updated successfully", data: song });
    } catch (error) {
        console.error("Error updating song:", error);
        res.status(500).json({ success: false, message: "Failed to update song", error: error.message });
    }
};


const likeSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: "Song not found" });

        // Assuming a "likes" field exists on the Song model
        if (song.likes.includes(req.user._id)) {
            song.likes = song.likes.filter(userId => userId !== req.user._id); // Remove like
        } else {
            song.likes.push(req.user._id); // Add like
        }

        await song.save();
        res.status(200).json({ success: true, message: "Song liked/unliked", data: song });
    } catch (error) {
        console.error("Error liking song:", error);
        res.status(500).json({ success: false, message: "Failed to like/unlike song", error: error.message });
    }
};

const getLikedSongs = async (req, res) => {
    try {
        const songs = await Song.find({ likes: req.user._id });
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        console.error("Error fetching liked songs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch liked songs", error: error.message });
    }
};


export { addSong, listSong, removeSong, getSongById, likeSong, getLikedSongs, updateSong }