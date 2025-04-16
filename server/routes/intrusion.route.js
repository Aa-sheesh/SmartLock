import express from "express";
import Intrusion from "../models/intrusion.model.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";
import crypto from "crypto";
import { logIntrusionToBlockchain } from "../lib/blockchain.js";

const router = express.Router();

// 🔒 GET all intrusion logs (admin only)
router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const intrusions = await Intrusion.find().sort({ attemptedAt: -1 });
    res.json(intrusions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch intrusion logs." });
  }
});

// 🛡️ POST intrusion report
router.post("/report", async (req, res) => {
  const intrusionData = {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    eventType: req.body.eventType || "unknown",
    additionalInfo: req.body.additionalInfo || "",
    geo: req.body.geo || {},
    attemptedAt: new Date(),
  };

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(intrusionData))
    .digest("hex");

  try {
    // Save to MongoDB (optional)
    const newLog = new Intrusion(intrusionData);
    await newLog.save();

    // Log to blockchain
    await logIntrusionToBlockchain(intrusionData.ipAddress, hash);

    res.status(201).json({ message: "Intrusion logged successfully." });
  } catch (err) {
    console.error("❌ Error logging intrusion:", err);
    res.status(500).json({ error: "Intrusion logging failed." });
  }
});

export default router;
