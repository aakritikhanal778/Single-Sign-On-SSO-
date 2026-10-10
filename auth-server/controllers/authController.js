import mongoose from "mongoose";

import User from "../models/User.js";

import {
  hashPassword,
  comparePassword
} from "../utils/hash.js";

import {
  generateToken
} from "../utils/token.js";


/* ==========================
   REGISTER USER
========================== */

export const signup = async (
  req,
  res
) => {

  try {

    console.log(
      "\n========== SIGNUP REQUEST =========="
    );

    const {
      username,
      password
    } = req.body;

    console.log(
      "Received username:",
      username
    );

    console.log(
      "Mongoose ReadyState:",
      mongoose.connection.readyState
    );

    console.log(
      "User Model:",
      User.modelName
    );

    console.log(
      "Collection:",
      User.collection.name
    );


    /* ==========================
       VALIDATE INPUT
    ========================== */

    if (!username || !password) {

      console.log(
        "Username or Password missing"
      );

      return res.status(400).json({
        message:
          "Username and password are required."
      });

    }


    /* ==========================
       CHECK EXISTING USER
    ========================== */

    console.log(
      "Checking if user already exists..."
    );

    const existingUser =
      await User.findOne({
        username
      });

    console.log(
      "findOne() completed"
    );

    if (existingUser) {

      console.log(
        "User already exists"
      );

      return res.status(409).json({
        message:
          "Username already exists."
      });

    }


    /* ==========================
       HASH PASSWORD
    ========================== */

    console.log(
      "Hashing password..."
    );

    const hashedPassword =
      await hashPassword(password);

    console.log(
      "Password hashed"
    );


    /* ==========================
       CREATE USER
    ========================== */

    console.log(
      "Creating user in MongoDB..."
    );

    const user =
      await User.create({
        username,
        password: hashedPassword
      });

    console.log(
      "User created successfully"
    );


    /* ==========================
       RESPONSE
    ========================== */

    return res.status(201).json({

      message:
        "User registered successfully.",

      user: {
        id: user._id,
        username: user.username
      }

    });

  } catch (err) {

    console.log(
      "========== SIGNUP ERROR =========="
    );

    console.error(err);

    console.log(
      "================================="
    );

    return res.status(500).json({

      message:
        "Internal Server Error",

      error:
        err.message

    });

  }

};


/* ==========================
   LOGIN
========================== */

export const login = async (
  req,
  res
) => {

  try {

    console.log(
      "\n========== LOGIN REQUEST =========="
    );

    const {
      username,
      password
    } = req.body;


    console.log(
      "Received username:",
      username
    );

    console.log(
      "Mongoose ReadyState:",
      mongoose.connection.readyState
    );

    console.log(
      "User Model:",
      User.modelName
    );

    console.log(
      "Collection:",
      User.collection.name
    );


    /* ==========================
       VALIDATE INPUT
    ========================== */

    if (!username || !password) {

      return res.status(400).json({

        message:
          "Username and password are required."

      });

    }


    /* ==========================
       FIND USER
    ========================== */

    console.log(
      "Searching user..."
    );

    const user =
      await User.findOne({
        username
      });

    console.log(
      "findOne() completed"
    );


    if (!user) {

      console.log(
        "User not found"
      );

      return res.status(401).json({

        message:
          "User not found."

      });

    }


    /* ==========================
       VERIFY PASSWORD
    ========================== */

    console.log(
      "Comparing password..."
    );

    const isMatch =
      await comparePassword(
        password,
        user.password
      );


    if (!isMatch) {

      console.log(
        "Invalid password"
      );

      return res.status(401).json({

        message:
          "Invalid password."

      });

    }


    /* ==========================
       GENERATE JWT
    ========================== */

    console.log(
      "Generating JWT..."
    );

    const token =
      generateToken(user);


    /* ==========================
       CREATE SSO COOKIE
    ========================== */

    console.log(
      "Setting SSO Cookie..."
    );

    res.cookie(
      "token",
      token,
      {
        httpOnly: true,

        sameSite: "lax",

        secure: false,

        /*
          Keep this aligned with
          your JWT expiration.
        */

        maxAge:
          15 * 60 * 1000
      }
    );


    console.log(
      "Login Successful"
    );


    /* ==========================
       DETERMINE RETURN APPLICATION
    ========================== */

    const redirectUrl =
      req.cookies.sso_redirect ||
      "http://localhost:5173";


    /*
      Security check:
      Only redirect to registered
      applications.
    */

    const allowedRedirects = [

      "http://localhost:5173",

      "http://localhost:5174"

    ];


    if (
      !allowedRedirects.includes(
        redirectUrl
      )
    ) {

      res.clearCookie(
        "sso_redirect"
      );

      return res.status(400).send(
        "Invalid redirect URL"
      );

    }
      

    /* ==========================
       REMOVE TEMPORARY REDIRECT
    ========================== */

    res.clearCookie(
      "sso_redirect"
    );

/* ==========================
   LOGIN SUCCESS RESPONSE
========================== */

return res.status(200).json({
  message: "Login successful"
});

    

  } catch (err) {

    console.log(
      "========== LOGIN ERROR =========="
    );

    console.error(err);

    console.log(
      "================================"
    );

    return res.status(500).json({

      message:
        "Internal Server Error",

      error:
        err.message

    });

  }

};