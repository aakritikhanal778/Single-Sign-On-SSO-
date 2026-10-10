import axios from "axios";

export const verifyToken = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    console.log("App2: Sending token to Auth Server for verification...");

    const response = await axios.get(
      "http://localhost:3000/me",
      {
        headers: {
          Cookie: cookie
        }
      }
    );

    // Auth Server successfully verified JWT
    req.user = response.data.user;

    console.log(
      "App2: JWT verified successfully for:",
      req.user.username
    );

    next();

  } catch (error) {

    console.log("App2: JWT verification failed");

    return res.status(401).json({
      message: "Invalid or expired authentication session"
    });
  }
};