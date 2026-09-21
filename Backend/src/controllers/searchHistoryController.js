import Song from "../models/Song.js";
import Album from "../models/Album.js";
import Artist from "../models/Artist.js";
import Playlist from "../models/Playlist.js";
import SearchHistory from "../models/SearchHistory.js";

// ========================================
// GET /api/search
// Search songs, albums, artists, playlists
// ========================================

export const search = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    if (!search) {
      return res.status(200).json({
        success: true,
        data: {
          songs: [],
          albums: [],
          artists: [],
          playlists: [],
        },
      });
    }

    // Search Songs
    const songs = await Song.find({
      name: {
        $regex: search,
        $options: "i",
      },
    }).limit(10);

    // Search Albums
    const albums = await Album.find({
      name: {
        $regex: search,
        $options: "i",
      },
    }).limit(10);

    // Search Artists
    const artists = await Artist.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          stageName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).limit(10);

    // Search Playlists
    const playlists = await Playlist.find({
      name: {
        $regex: search,
        $options: "i",
      },
    }).limit(10);

    // Save search history if user is logged in
    if (req.user) {
      await SearchHistory.create({
        user: req.user._id,
        keyword: search,
        searchType: "Song",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        songs,
        albums,
        artists,
        playlists,
      },
    });

  } catch (error) {
    console.error("Failed to search:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};