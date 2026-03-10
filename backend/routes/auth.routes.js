import express from "express";
import passport from "passport";

import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protect, checkAuth);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    generateToken(req.user._id, res);

    res.redirect("http://localhost:5173/oauth-success");
  },
);

export default router;
