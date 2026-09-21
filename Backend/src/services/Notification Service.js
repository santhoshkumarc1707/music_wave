import User from "../models/User.js";
import Notification from "../models/Notification.js";


// ========================================
// Send notification to ALL users
// ========================================

export const notifyAllUsers = async ({
  title,
  message,
  type,
  artist = null,
  song = null,
  album = null,
  playlist = null,
  image = "",
  actionUrl = "",
}) => {
  try {
    // Get all active users
    const users = await User.find({
      status: "Active",
    }).select("_id");

    if (!users.length) {
      return;
    }

    const notifications = users.map((user) => ({
      user: user._id,

      title,
      message,
      type,

      artist,
      song,
      album,
      playlist,

      image,
      actionUrl,

      isRead: false,
      isDeleted: false,
    }));

    await Notification.insertMany(notifications);

    console.log(
      `Notification sent to ${notifications.length} users`
    );

  } catch (error) {
    console.error(
      "Failed to send notifications:",
      error
    );
  }
};