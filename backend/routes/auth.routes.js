import express from "express";
import passport from "passport";

import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// cookie
import { cookieOptions } from "../utils/cookie.js";

// token
import { generateAccessToken } from "../utils/token.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

// authenticated user
userRoutes.post("/logout", verifyToken, logout);
userRoutes.get("/checkAuth", verifyToken, checkAuth);

// google
userRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

userRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // generate JWT like manual login
    const accessToken = generateAccessToken(req.user);

    // set cookie
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.redirect("http://localhost:5173/dashboard");
  },
);

export default userRoutes;
