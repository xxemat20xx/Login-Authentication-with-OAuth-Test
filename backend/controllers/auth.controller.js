import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookie.js";

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const accessToken = generateAccessToken(user);

    // Set cookie
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LOGOUT ----------------
export const logout = (req, res) => {
  // Clear cookie
  res.clearCookie("accessToken", {
    ...cookieOptions,
    httpOnly: true,
  });

  res.json({ message: "Logged out successfully" });
};

// ---------------- CHECK AUTH ----------------
export const checkAuth = async (req, res) => {
  try {
    // req.userId should be set by your verifyToken middleware
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized, no userId found" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
