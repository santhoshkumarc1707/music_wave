import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    stageName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Band", "Other"],
      default: "Other",
    },

    country: {
      type: String,
      default: "",
    },

    language: [
      {
        type: String,
      },
    ],

    genres: [
      {
        type: String,
      },
    ],

    followers: {
      type: Number,
      default: 0,
    },

    monthlyListeners: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    socialLinks: {
      instagram: String,
      facebook: String,
      youtube: String,
      spotify: String,
      website: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artist =
  mongoose.models.Artist ||
  mongoose.model("Artist", artistSchema);

export default Artist;