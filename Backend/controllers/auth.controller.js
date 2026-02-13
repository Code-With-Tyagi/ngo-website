import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
};

//Register a new user /api/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation checks
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // finding the existing user
        const existingUser = await User.findOne({ email });

        // if user already exists
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in instead."
            });
        }

        // hashing the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Generate token and set cookie
        generateToken(res, newUser._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
}

// Login user /api/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist. Please register first."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate token and set cookie
        generateToken(res, user._id);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in user",
            error: error.message
        });
    }
}

// Logout user /api/logout
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out user",
            error: error.message
        });
    }
}
