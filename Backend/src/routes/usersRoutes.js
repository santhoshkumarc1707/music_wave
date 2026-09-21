import express from "express";
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUserById, 
  deleteUserById, 
  updateProfileImage, 
  changePassword, 
  toggleAdminStatus 
} from "../controllers/userController.js";
// import auth from "../middleware/auth.js";
// import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";
import upload from "../middleware/multer.js"; // For handling file uploads

const userRouter = express.Router();

// Create a new user (with optional profile picture)
 userRouter.post("/", upload.single("profilePic"), createUser);

// Get all users (admin access required)
 userRouter.get("/",  getAllUsers);

// Get a user by ID
 userRouter.get("/:id", [validateObjectId,], getUserById);

// Update user by ID
 userRouter.put("/:id", [validateObjectId], updateUserById);

// Delete user by ID
 userRouter.delete("/:id", [validateObjectId], deleteUserById);

// Update profile image
 userRouter.put("/upload/:id", [validateObjectId, upload.single("profilePic")], updateProfileImage);

// Change password
 userRouter.put("/:id/change-password", [validateObjectId], changePassword);

// Toggle admin status
 userRouter.put("/:id/toggle-admin", [validateObjectId], toggleAdminStatus);

export default  userRouter;
