import crypto from "crypto";
import { logIntrusionToBlockchain } from "../lib/blockchain.js";

export async function reportIntrusion(req, res) {
  const intrusionData = {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    eventType: "brute_force",
    additionalInfo: "Multiple failed logins",
    geo: {
      city: "Delhi",
      region: "DL",
      country: "India",
      lat: 28.61,
      lon: 77.23,
    },
  };

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(intrusionData))
    .digest("hex");

  try {
    await logIntrusionToBlockchain(intrusionData.ipAddress, hash);
    res.status(200).json({ message: "Intrusion logged to blockchain." });
  } catch (err) {
    console.error("Error logging intrusion:", err);
    res.status(500).json({ error: "Blockchain logging failed." });
  }
}
