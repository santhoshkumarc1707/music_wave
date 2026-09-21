import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Setting from "../models/Setting.js";
import Activity from "../models/ActivityLog.js";

const seedSuperAdmin = async () => {
  try {
    // =========================
    // Find Super Admin Role
    // =========================

    const role = await Role.findOne({
      name: "Super Admin",
    });

    if (!role) {
      console.log("Super Admin role not found");
      return;
    }

    // =========================
    // Check Existing Super Admin
    // =========================

    const exists = await User.findOne({
      email: "admin@musicwave.com",
    });

    if (exists) {
      console.log("Super Admin already exists");

      // =========================
      // Create Settings If Missing
      // =========================

      const settingsExists = await Setting.findOne({
        user: exists._id,
      });

      if (!settingsExists) {
        await Setting.create({
          user: exists._id,

          theme: "dark",
          language: "en",

          autoplay: true,
          shuffle: false,

          streamingQuality: "high",

          notifications: true,
          emailNotifications: false,

          explicitContent: false,
          privateAccount: false,
        });

        console.log("Super Admin settings created");
      }

      // =========================
      // Create Login Activity
      // =========================

      const activityExists = await Activity.findOne({
        userId: exists._id,
        activityType: "LOGIN",
      });

      if (!activityExists) {
        await Activity.create({
          userId: exists._id,
          activityType: "LOGIN",
          ipAddress: "127.0.0.1",
          device: "System",
        });

        console.log("Super Admin activity created");
      }

      return;
    }

    // =========================
    // Hash Password
    // =========================

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    // =========================
    // Create Super Admin
    // =========================

    const user = await User.create({
      name: "Super Admin",

      username: "superadmin",

      email: "admin@musicwave.com",

      phone: "9999999999",

      password: hashedPassword,

      gender: "male",

      dob: {
        day: "01",
        month: "01",
        year: "1995",
      },

      roleId: role._id,

      emailVerified: true,

      status: "Active",

      isPremium: true,
    });

    console.log("Super Admin created");

    // =========================
    // Create Default Settings
    // =========================

    await Setting.create({
      user: user._id,

      theme: "dark",
      language: "en",

      autoplay: true,
      shuffle: false,

      streamingQuality: "high",

      notifications: true,
      emailNotifications: false,

      explicitContent: false,
      privateAccount: false,
    });

    console.log("Super Admin settings created");

    // =========================
    // Create Activity Log
    // =========================

    await Activity.create({
      userId: user._id,

      activityType: "LOGIN",

      ipAddress: "127.0.0.1",

      device: "System",

      duration: 0,
    });

    console.log("Super Admin activity created");

  } catch (error) {
    console.error(
      "Failed to create Super Admin:",
      error
    );

    throw error;
  }
};

export default seedSuperAdmin;