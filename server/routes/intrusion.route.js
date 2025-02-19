// server/routes/intrusion.route.js
import express from "express";
import Intrusion from "../models/intrusion.model.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET all intrusion logs (admin only)
router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const intrusions = await Intrusion.find().sort({ attemptedAt: -1 });
    res.json(intrusions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch intrusion logs." });
  }
});

export default router;
