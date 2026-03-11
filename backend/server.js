import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

// db import
import { connectDB } from "./lib/db.js";

// routes import
import userRoutes from "./routes/auth.routes.js";

// passport config
import passport from "passport";
import "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
  connectDB();
});
