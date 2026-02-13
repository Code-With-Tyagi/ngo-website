import express from "express";
let router=express.Router();
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// Register a new user
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);
// Logout user (protected route)
router.post("/logout", verifyToken, logoutUser);

export default router;