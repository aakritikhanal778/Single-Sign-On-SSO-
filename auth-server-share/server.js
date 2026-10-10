import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

// 🔹 Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// 🔹 Routes
app.use("/auth", authRoutes);

// 🔹 Protected route
app.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  });
});

// 🔹 Check logged-in user
app.get("/me", protect, (req, res) => {
  res.json({
    user: req.user,
  });
});

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Auth Server Running");
});

const PORT = process.env.PORT || 3000;

// 🔹 Start server only after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();