import { verifyToken } from "../utils/token.js";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No authentication token provided."
    });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();

  } catch (err) {
    console.error("JWT Error:", err.message);

    return res.status(403).json({
      message: "Invalid or expired token."
    });
  }
};