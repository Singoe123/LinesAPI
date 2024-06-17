import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followerRoutes.js";
import repostRoutes from "./routes/repostRoutes.js";
import { notFound, errorHandler } from "./utils/errorHandler.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/reposts", repostRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

export default app;
