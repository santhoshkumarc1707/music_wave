import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    activityType: {
      type: String,
      enum: [
        "PLAY_SONG",
        "PAUSE_SONG",
        "LIKE_SONG",
        "UNLIKE_SONG",
        "CREATE_PLAYLIST",
        "DELETE_PLAYLIST",
        "FOLLOW_ARTIST",
        "UNFOLLOW_ARTIST",
        "SEARCH",
        "SHARE_SONG",
        "LOGIN",
        "LOGOUT",
      ],
      required: true,
      default: null
    },

    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },

    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },

    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      default: null,
    },

    searchText: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Activity =
  mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);

export default Activity;