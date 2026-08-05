import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "non-binary"],
      required: true,
    },

    dob: {
      day: String,
      month: String,
      year: String,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    profileImage: {
      data: String,
      contentType: String,
    },

    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],

    favoriteAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],

    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      roleId: this.roleId,
      email: this.email,
      name: this.name,
    },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );
};

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;