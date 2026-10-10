import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { verifyToken } from "./utils/token.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ==========================
   MIDDLEWARE
========================== */

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true
  })
);

/* ==========================
   STATIC FILES
========================== */

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

/* ==========================
   CENTRAL SSO LOGIN
========================== */

app.get("/login", (req, res) => {

  const { redirect } = req.query;

  const allowedRedirects = [
    "http://localhost:5173",
    "http://localhost:5174"
  ];

  /*
    Validate redirect destination.
  */

  if (
    redirect &&
    !allowedRedirects.includes(redirect)
  ) {
    return res.status(400).send(
      "Invalid redirect URL"
    );
  }

  /*
    Store the application that requested
    authentication.
  */

  if (redirect) {

    res.cookie(
      "sso_redirect",
      redirect,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 5 * 60 * 1000
      }
    );
  }

  /*
    Check whether an existing JWT is actually valid.
  */

  const token = req.cookies.token;

  if (token) {

    try {

      /*
        IMPORTANT:
        Actually verify the JWT.
      */

      const decoded = verifyToken(token);

      console.log(
        "Existing valid SSO session:",
        decoded.username
      );

      /*
        Token is valid.
        Send user directly back to
        the application that requested login.
      */

      const redirectUrl =
        redirect || "http://localhost:5173";

      res.clearCookie("sso_redirect");

      return res.redirect(redirectUrl);

    } catch (err) {

      /*
        Token exists but is invalid/expired.
        Remove it and show the login page.
      */

      console.log(
        "Existing SSO token is invalid or expired."
      );

      res.clearCookie("token");
    }
  }

  /*
    No valid existing session.
    Show the CENTRAL login page.
  */

  return res.sendFile(
    path.join(
      __dirname,
      "public",
      "login.html"
    )
  );
});

/* ==========================
   AUTHENTICATION ROUTES
========================== */

app.use(
  "/auth",
  authRoutes
);

/* ==========================
   PROTECTED ROUTE
========================== */

app.get(
  "/protected",
  protect,
  (req, res) => {

    res.json({
      message:
        "Protected data accessed",
      user: req.user
    });

  }
);

/* ==========================
   CHECK SSO SESSION
========================== */

app.get(
  "/me",
  protect,
  (req, res) => {

    res.json({
      user: req.user
    });

  }
);

/* ==========================
   TEST ROUTE
========================== */

app.get(
  "/",
  (req, res) => {
    res.send(
      "Auth Server Running"
    );
  }
);

/* ==========================
   START SERVER
========================== */

const PORT =
  process.env.PORT || 3000;

const startServer = async () => {

  try {

    await connectDB();

    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );

      }
    );

  } catch (err) {

    console.error(
      "Failed to start server:",
      err
    );

  }
};

startServer();