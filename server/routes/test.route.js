// server/routes/test.route.js
import express from "express";
import Intrusion from "../models/intrusion.model.js";

const router = express.Router();

router.get("/firewall", async (req, res) => {
  try {
    await Intrusion.create({
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      eventType: "suspicious_activity",
      additionalInfo: "Test firewall hit triggered.",
      geo: { city: "Test City", region: "Test Region", country: "Test Country" }
    });
    res.json({ message: "Test firewall hit recorded." });
  } catch (err) {
    res.status(500).json({ message: "Failed to record test firewall hit." });
  }
});

export default router;
