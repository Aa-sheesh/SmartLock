// server/routes/dashboard.route.js
import express from "express";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";
import Intrusion from "../models/intrusion.model.js";

const router = express.Router();

// GET /api/alerts - Returns the latest 10 intrusion logs as alerts
router.get("/alerts", protectRoute, adminRoute, async (req, res) => {
  try {
    const alerts = await Intrusion.find()
      .sort({ attemptedAt: -1 })
      .limit(10);
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
});

// GET /api/metrics - Returns aggregated intrusion metrics
router.get("/metrics", protectRoute, adminRoute, async (req, res) => {
  try {
    const totalIntrusions = await Intrusion.countDocuments();
    const failedLogin = await Intrusion.countDocuments({ eventType: "failed_login" });
    const bruteForce = await Intrusion.countDocuments({ eventType: "brute_force" });
    const suspicious = await Intrusion.countDocuments({ eventType: "suspicious_activity" });
    
    res.json({
      threatsBlocked: failedLogin,
      firewallHits: suspicious,
      intrusionsDetected: totalIntrusions,
      bruteForceAttempts: bruteForce
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ message: "Failed to fetch metrics" });
  }
});

export default router;
