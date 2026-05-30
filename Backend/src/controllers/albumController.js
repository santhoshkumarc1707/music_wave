import { v2 as cloudinary } from "cloudinary";
import Album from "../models/Album.js";
import Song from "../models/Song.js";
import { User } from "../models/user.js";

const addAlbum = async (req, res) => {
    try {
      const { name, desc, bgColour } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
      }
  
      const imageFile = req.file;
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
  
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const albumData = {
        name,
        desc,
        bgColour,
        image: imageUpload.secure_url,
        user: user._id,
        // songs:songs._id,
      };
  
      const album = new Album(albumData);
      await album.save();
  
      res.status(201).json({ success: true, message: "Album added successfully" });
    } catch (error) {
      console.error("Failed at addAlbum: ", error);
      res.status(400).json({ success: false, message: "Album add failed", error: error.message });
    }
  };
  
const listAlbum = async (req, res) => {
  try {
    const allAlbums = await Album.find({});
    res.status(201).json({ success: true, albums: allAlbums });
  } catch (error) {
    console.log("Failed at listAlbum, ", error);
    res.status(400).json({ success: false, message: "Album List Failed" });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findOne({ _id: id });

    const albumSongs = await Song.find({ album: album.name });
    albumSongs.map(async (item) => {
      await Song.findByIdAndDelete(item._id);
    });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Album removed success" });
  } catch (error) {
    console.log("Failed at removeAlbum, ", error);
    res.status(400).json({ success: false, message: "Album removed Failed" });
  }
};

export { addAlbum, listAlbum, removeAlbum };
