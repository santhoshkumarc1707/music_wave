// import express from "express";
// import { User } from "../models/user.js";
// import bcrypt from "bcrypt";

// const authRouter = express.Router();


// authRouter.post("/", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.status(400).send({ message: "Invalid email or password!" });

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword)
//       return res.status(400).send({ message: "Invalid email or password!" });

//     const token = user.generateAuthToken();
//     const role = user.isAdmin;
//     const id = user._id;

//     res
//       .status(200)
//       .send({ data: token, role: role, id: id, message:`Welcome ${user.name}! ` });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

/**
 * ==========================================
 * Register User
 * POST /api/auth/register
 * ==========================================
 */
 const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check Existing User
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            ...req.body,
            password: hashPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/**
 * ==========================================
 * Login User
 * POST /api/auth/login
 * ==========================================
 */
 const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Logout
 * POST /api/auth/logout
 * ==========================================
 */
 const logout = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Forgot Password
 * POST /api/auth/forgot-password
 * ==========================================
 */
 const forgotPassword = async (req, res) => {

    try {

        // TODO:
        // 1. Verify Email
        // 2. Generate OTP
        // 3. Send Email

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Reset Password
 * POST /api/auth/reset-password
 * ==========================================
 */
 const resetPassword = async (req, res) => {

    try {

        // TODO:
        // Verify OTP
        // Hash Password
        // Update Password

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Send OTP
 * POST /api/auth/send-otp
 * ==========================================
 */
 const sendOTP = async (req, res) => {

    try {

        // TODO:
        // Generate OTP
        // Save OTP
        // Send Mail

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Verify OTP
 * POST /api/auth/verify-otp
 * ==========================================
 */
 const verifyOTP = async (req, res) => {

    try {

        // TODO:
        // Verify OTP

        res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * ==========================================
 * Refresh Token
 * POST /api/auth/refresh-token
 * ==========================================
 */
 const refreshToken = async (req, res) => {

    try {

        // TODO:
        // Generate New Access Token

        res.status(200).json({
            success: true,
            message: "Token Refreshed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const demo=async(req,res)=>{
 res.status(200).json({
    success:true,
    message:"sucessfully login"
 }) 
}
export {login, logout, register,forgotPassword,refreshToken,resetPassword,sendOTP,verifyOTP,demo}