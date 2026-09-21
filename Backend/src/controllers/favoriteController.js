import Favorite from "../models/Favorite.js"
import Song from "../models/Song.js";



export const getfavorite = async (req, res) => {
  try {
    const favorite = await Favorite.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorite.length,
      data: favorite,
    });
  } catch (error) {
    console.error("Failed to get artists:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getFavoriteByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const favorites = await Favorite.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });

  } catch (error) {
    console.error("Failed to get user favorites:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const addFavorite = async (req, res) => {
  try {
    const { favoriteType, favoriteItem } = req.body;

    const userId = req.user._id;

    // Check required fields
    if (!favoriteType || !favoriteItem) {
      return res.status(400).json({
        success: false,
        message: "favoriteType and favoriteItem are required",
      });
    }

    // Check valid type
    const allowedTypes = [
      "Song",
      "Album",
      "Artist",
      "Playlist",
    ];

    if (!allowedTypes.includes(favoriteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid favorite type",
      });
    }

    // Check duplicate favorite
    const existingFavorite = await Favorite.findOne({
      user: userId,
      favoriteType,
      favoriteItem,
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "Already added to favorites",
      });
    }

    // Create favorite
    const favorite = await Favorite.create({
      user: userId,
      favoriteType,
      favoriteItem,
    });

    res.status(201).json({
      success: true,
      message: `${favoriteType} added to favorites`,
      data: favorite,
    });

  } catch (error) {
    console.error("Failed to add favorite:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deletefavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "favorite not found",
      });
    }

    await favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "favorite deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete favorite:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

