import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    favoriteType: {
      type: String,
      enum: ["Song", "Album", "Artist", "Playlist"],
      required: true,
    },

    favoriteItem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "favoriteType",
    },
  },
  {
    timestamps: true,
  }
);


const Favorite =
  mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);

export default Favorite;