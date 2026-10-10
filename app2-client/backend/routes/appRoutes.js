import express from "express";

import { getProfile } from "../controller/appControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get(
  "/profile",
  verifyToken,
  getProfile
);

export default router;