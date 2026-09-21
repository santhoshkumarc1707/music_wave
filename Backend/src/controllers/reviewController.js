import Review from "../models/Review.js";
import Song from "../models/Song.js";

// ========================================
// GET /api/reviews/:songId
// Get all reviews for a song
// ========================================

export const getReviewsBySong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    const reviews = await Review.find({
      song: songId,
      isApproved: true,
    })
      .populate("user", "name username profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("Failed to get reviews:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// POST /api/reviews
// Create review
// ========================================

export const createReview = async (req, res) => {
  try {
    const {
      song,
      rating,
      title,
      comment,
    } = req.body;

    if (!song) {
      return res.status(400).json({
        success: false,
        message: "Song ID is required",
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check song
    const existingSong = await Song.findById(song);

    if (!existingSong) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Check if user already reviewed this song
    const existingReview = await Review.findOne({
      user: req.user._id,
      song,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this song",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      song,
      rating,
      title: title || "",
      comment: comment || "",
    });

    const populatedReview = await Review.findById(review._id)
      .populate("user", "name username profileImage");

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: populatedReview,
    });
  } catch (error) {
    console.error("Failed to create review:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// PUT /api/reviews/:id
// Update review
// ========================================

export const updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }

      review.rating = rating;
    }

    if (title !== undefined) {
      review.title = title;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    review.isEdited = true;

    await review.save();

    const updatedReview = await Review.findById(review._id)
      .populate("user", "name username profileImage");

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Failed to update review:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ========================================
// DELETE /api/reviews/:id
// Delete review
// ========================================

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete review:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};