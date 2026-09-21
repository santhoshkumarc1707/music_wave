// import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     message: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     type: {
//       type: String,
//       enum: [
//         "WELCOME",
//         "NEW_SONG",
//         "NEW_ALBUM",
//         "PLAYLIST",
//         "LIKE",
//         "COMMENT",
//         "FOLLOW",
//         "SUBSCRIPTION",
//         "PAYMENT",
//         "SYSTEM",
//         "PROMOTION"
//       ],
//       required: true,
//     },

//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     artist: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Artist",
//       default: null,
//     },

//     song: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Song",
//       default: null,
//     },

//     playlist: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Playlist",
//       default: null,
//     },

//     image: {
//       type: String,
//       default: "",
//     },

//     actionUrl: {
//       type: String,
//       default: "",
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },

//     readAt: {
//       type: Date,
//       default: null,
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Notification =
//   mongoose.models.Notification ||
//   mongoose.model("Notification", NotificationSchema);

// export default Notification;




import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    // User who receives the notification
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // What was created
    type: {
      type: String,
      enum: [
        "NEW_SONG",
        "NEW_ALBUM",
        "NEW_PLAYLIST",
      ],
      required: true,
    },

    // Artist who created the content
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },

    // Created content
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      default: null,
    },

    image: {
      type: String,
      default: "",
    },

    // Frontend navigation
    actionUrl: {
      type: String,
      default: "",
    },

    // Notification status
    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;