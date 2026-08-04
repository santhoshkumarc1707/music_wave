import mongoose from "mongoose";

const ListeningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    playedDuration: {
      type: Number,
      default: 0, // Seconds listened
    },

    totalDuration: {
      type: Number,
      default: 0, // Song length
    },

    completed: {
      type: Boolean,
      default: false,
    },

    device: {
      type: String,
      enum: ["Web", "Android", "iOS", "Desktop"],
      default: "Web",
    },

    source: {
      type: String,
      enum: [
        "Search",
        "Playlist",
        "Album",
        "Artist",
        "Recommendation",
        "Liked Songs",
        "Queue",
      ],
      default: "Search",
    },

    playCount: {
      type: Number,
      default: 1,
    },

    lastPlayedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);



const ListeningHistory =
  mongoose.models.ListeningHistory ||
  mongoose.model("ListeningHistory", ListeningHistorySchema);

export default ListeningHistory;