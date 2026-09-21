import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import Album from "../models/Album.js";

// ========================================
// GET /api/artists
// Get all artists
// ========================================

export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists,
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


// ========================================
// GET /api/artists/:id
// Get artist by ID
// ========================================

export const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    console.error("Failed to get artist:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/artists
// Create artist
// ========================================

export const createArtist = async (req, res) => {
  try {
    const {
      name,
      stageName,
      bio,
      profileImage,
      coverImage,
      gender,
      country,
      language,
      genres,
      socialLinks,
      isActive,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Artist name is required",
      });
    }

    const existingArtist = await Artist.findOne({
      name: name.trim(),
    });

    if (existingArtist) {
      return res.status(409).json({
        success: false,
        message: "Artist already exists",
      });
    }

    const artist = await Artist.create({
      name,
      stageName,
      bio,
      profileImage,
      coverImage,
      gender,
      country,
      language,
      genres,
      socialLinks,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Artist created successfully",
      data: artist,
    });
  } catch (error) {
    console.error("Failed to create artist:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// PUT /api/artists/:id
// Update artist
// ========================================

export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    const {
      name,
      stageName,
      bio,
      profileImage,
      coverImage,
      gender,
      country,
      language,
      genres,
      socialLinks,
      isActive,
    } = req.body;

    artist.name = name ?? artist.name;
    artist.stageName = stageName ?? artist.stageName;
    artist.bio = bio ?? artist.bio;
    artist.profileImage = profileImage ?? artist.profileImage;
    artist.coverImage = coverImage ?? artist.coverImage;
    artist.gender = gender ?? artist.gender;
    artist.country = country ?? artist.country;
    artist.language = language ?? artist.language;
    artist.genres = genres ?? artist.genres;
    artist.socialLinks = socialLinks ?? artist.socialLinks;
    artist.isActive = isActive ?? artist.isActive;

    await artist.save();

    res.status(200).json({
      success: true,
      message: "Artist updated successfully",
      data: artist,
    });
  } catch (error) {
    console.error("Failed to update artist:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// DELETE /api/artists/:id
// Delete artist
// ========================================

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    await Artist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Artist deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete artist:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// GET /api/artists/:id/songs
// Get artist songs
// ========================================

export const getArtistSongs = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    const songs = await Song.find({
      artistId: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      artist: artist.name,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error("Failed to get artist songs:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// GET /api/artists/:id/albums
// Get artist albums
// ========================================

export const getArtistAlbums = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    const albums = await Album.find({
      artistId: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      artist: artist.name,
      count: albums.length,
      data: albums,
    });
  } catch (error) {
    console.error("Failed to get artist albums:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};