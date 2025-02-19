// server/routes/userActivity.route.js
import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Dummy endpoint: In a real app, fetch from your database
router.get("/activity", protectRoute, async (req, res) => {
  try {
    // Example: fetch activity logs for the authenticated user
    // Replace with your actual database query
    const activities = [
      { id: 1, message: "Logged in successfully.", timestamp: Date.now() },
      { id: 2, message: "Updated profile information.", timestamp: Date.now() - 3600000 },
    ];
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent activity." });
  }
});

export default router;
