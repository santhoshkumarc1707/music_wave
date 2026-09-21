import Genre from "../models/Genre.js";

// ========================================
// GET /api/genres
// Get all genres
// ========================================

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: genres.length,
      data: genres,
    });
  } catch (error) {
    console.error("Failed to get genres:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// GET /api/genres/:id
// Get genre by ID
// ========================================

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    res.status(200).json({
      success: true,
      data: genre,
    });
  } catch (error) {
    console.error("Failed to get genre:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// POST /api/genres
// Create genre
// ========================================

export const createGenre = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      color,
      isActive,
    } = req.body;

    // Check name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Genre name is required",
      });
    }

    // Check duplicate genre
    const existingGenre = await Genre.findOne({
      name: name.trim(),
    });

    if (existingGenre) {
      return res.status(409).json({
        success: false,
        message: "Genre already exists",
      });
    }

    // Create genre
    const genre = await Genre.create({
      name: name.trim(),
      description,
      image,
      color,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Genre created successfully",
      data: genre,
    });
  } catch (error) {
    console.error("Failed to create genre:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// PUT /api/genres/:id
// Update genre
// ========================================

export const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    const {
      name,
      description,
      image,
      color,
      isActive,
    } = req.body;

    genre.name = name ?? genre.name;
    genre.description = description ?? genre.description;
    genre.image = image ?? genre.image;
    genre.color = color ?? genre.color;
    genre.isActive = isActive ?? genre.isActive;

    await genre.save();

    res.status(200).json({
      success: true,
      message: "Genre updated successfully",
      data: genre,
    });
  } catch (error) {
    console.error("Failed to update genre:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========================================
// DELETE /api/genres/:id
// Delete genre
// ========================================

export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    await Genre.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Genre deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete genre:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


