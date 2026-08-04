import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#1DB954",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalSongs: {
      type: Number,
      default: 0,
    },

    totalArtists: {
      type: Number,
      default: 0,
    },

    totalAlbums: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Genre =
  mongoose.models.Genre ||
  mongoose.model("Genre", GenreSchema);

export default Genre;