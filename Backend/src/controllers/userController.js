import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

/**
 * Create a new user with a profile picture.
 */
const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(403).json({ message: "User with given email already exists!" });

    // Upload profile picture to Cloudinary
    let profilePic = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      profilePic = uploadResult.secure_url;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashPassword,
      profileImg: profilePic ? { data: profilePic, contentType: req.file.mimetype } : null,
    });
    await newUser.save();

    newUser.password = undefined;
    newUser.__v = undefined;
    res.status(201).json({ data: newUser, message: "Account created successfully" });
  } catch (error) {
    console.error("Failed at createUser:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Get all users.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Failed at getAllUsers:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Get a user by ID.
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Failed at getUserById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Update a user's information by ID.
 */
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password -__v");

    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ data: user, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Failed at updateUserById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Delete a user by ID.
 */
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "Successfully deleted user." });
  } catch (error) {
    console.error("Failed at deleteUserById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Update profile image for a user.
 */
const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    user.profileImg = {
      data: imageUpload.secure_url,
      contentType: req.file.mimetype,
    };
    await user.save();

    res.status(200).json({ message: "Profile image updated successfully.", data: user });
  } catch (error) {
    console.error("Failed at updateProfileImage:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Change the password for a user.
 */
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Old and new passwords are required." });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ message: "Incorrect old password." });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Failed at changePassword:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Toggle admin status for a user.
 */
const toggleAdminStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.status(200).json({ message: `User admin status updated to ${user.isAdmin}.` });
  } catch (error) {
    console.error("Failed at toggleAdminStatus:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateProfileImage,
  changePassword,
  toggleAdminStatus,
};
