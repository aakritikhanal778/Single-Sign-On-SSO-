import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRoutes from "./routes/appRoutes.js";

const app = express();

/* ==========================
   MIDDLEWARES
========================== */

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
);

/* ==========================
   ROUTES
========================== */

app.use("/", appRoutes);

/* ==========================
   TEST ROUTE
========================== */

app.get("/", (req, res) => {
  res.json({
    message: "App2 Backend Running"
  });
});

/* ==========================
   START SERVER
========================== */

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App2 Backend running on port ${PORT}`);
});