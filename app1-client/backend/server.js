import express from "express";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 3001;
const AUTH_SERVER = "http://localhost:3000";

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// 🔐 Check authentication via Auth Server
app.get("/profile", async (req, res) => {
  try {
    const response = await axios.get(
      `${AUTH_SERVER}/me`,
      {
        headers: {
          Cookie: req.headers.cookie || ""
        }
      }
    );

    res.json({
      message: "User authenticated in App1",
      user: response.data.user
    });

  } catch (err) {
    console.error(
      "Authentication check failed:",
      err.response?.data || err.message
    );

    res.status(401).json({
      message: "Not authenticated"
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("App1 Backend Running");
});

app.listen(PORT, () => {
  console.log(`App1 running on port ${PORT}`);
});