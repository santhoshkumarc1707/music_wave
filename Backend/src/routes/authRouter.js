import express from "express";
import  {login, logout,demo, register,forgotPassword,refreshToken,resetPassword,sendOTP,verifyOTP}  from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/l",demo);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
