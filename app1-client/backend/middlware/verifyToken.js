import axios from "axios";

const AUTH_SERVER = "http://localhost:3000";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    const response = await axios.get(
      `${AUTH_SERVER}/me`,
      {
        headers: {
          Cookie: `token=${token}`
        }
      }
    );

    req.user = response.data.user;

    next();

  } catch (error) {
    console.error(
      "Token verification failed:",
      error.response?.data || error.message
    );

    return res.status(401).json({
      message: "Invalid or expired authentication"
    });
  }
};