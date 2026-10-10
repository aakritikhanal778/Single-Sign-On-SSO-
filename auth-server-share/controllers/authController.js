
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

/* ==========================
   SIGNUP CONTROLLER
========================== */
export const signup = async (req, res) => {
  try {
    console.log("========== SIGNUP START ==========");

    const { username, password } = req.body;

    console.log("Received Data:", { username });

    // Check if all fields are provided
    if (!username || !password) {
      console.log("Username or Password missing");
      return res.status(400).json({
        message: "Username and password are required."
      });
    }

    console.log("Checking if user already exists...");

    const existingUser = await User.findOne({ username });

    console.log("User.findOne completed");

    if (existingUser) {
      console.log("User already exists");

      return res.status(409).json({
        message: "Username already exists."
      });
    }

    console.log("Hashing password...");

    const hashedPassword = await hashPassword(password);

    console.log("Password hashed");

    console.log("Creating user in MongoDB...");

    const user = await User.create({
      username,
      password: hashedPassword
    });

    console.log("User created successfully");

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {

    console.log("========== SIGNUP ERROR ==========");
    console.error(err);
    console.log("==================================");

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};


/* ==========================
   LOGIN CONTROLLER
========================== */
export const login = async (req, res) => {
  try {

    console.log("========== LOGIN START ==========");

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required."
      });
    }

    console.log("Searching user...");

    const user = await User.findOne({ username });

    console.log("User search completed");

    if (!user) {
      return res.status(401).json({
        message: "User not found."
      });
    }

    console.log("Comparing password...");

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password."
      });
    }

    console.log("Generating JWT...");

    const token = generateToken(user);

    console.log("Setting Cookie...");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    console.log("Login Successful");

    res.status(200).json({
      message: "Login successful."
    });

  } catch (err) {

    console.log("========== LOGIN ERROR ==========");
    console.error(err);
    console.log("================================");

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};