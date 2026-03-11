import { User } from "../models/user.model.js";

// cookie
import { cookieOptions } from "../utils/cookie.js";

// token
import { generateAccessToken } from "../utils/token.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (password.length < 6)
      return res
        .status(401)
        .json({ message: "Password must be at least 6 character" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    // save to database
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();

    res.status(200).json({
      message: "Successfully registered.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", cookieOptions);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
