import express from "express";

import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/",getMyNotifications);

notificationRouter.put("/:id/read",markAsRead);

notificationRouter.put("/read-all",markAllAsRead);

export default notificationRouter;