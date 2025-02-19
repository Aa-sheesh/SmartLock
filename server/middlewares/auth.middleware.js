import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import geoip from "geoip-lite";
import { sendNotification } from "../lib/mailer.js";
import Intrusion from "../models/intrusion.model.js";

// In-memory rate limiter store (for demonstration purposes)
const rateLimitStore = {};
const MAX_REQUESTS = 5; // Maximum allowed requests per IP in the window
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export const protectRoute = async (req, res, next) => {
  try {
    // --- Rate Limiting ---
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      // First request from this IP; initialize counter
      rateLimitStore[ip] = { count: 1, startTime: now };
    } else {
      let data = rateLimitStore[ip];
      if (now - data.startTime < WINDOW_MS) {
        data.count++;
        if (data.count > MAX_REQUESTS) {
          // Rate limit exceeded: capture geolocation info
          const geo = geoip.lookup(ip);
          const geoInfo = geo
            ? `${geo.city}, ${geo.region}, ${geo.country}`
            : "Localhost/Unknown location";
          const geoData = geo
            ? {
                city: geo.city,
                region: geo.region,
                country: geo.country,
                lat: geo.ll ? geo.ll[0] : undefined,
                lon: geo.ll ? geo.ll[1] : undefined,
              }
            : { city: "Localhost", region: "Localhost", country: "Localhost" };

          // Log the intrusion event to the database
          await Intrusion.create({
            ipAddress: ip,
            userAgent: req.headers["user-agent"],
            eventType: "brute_force",
            additionalInfo: "Exceeded allowed request limit.",
            geo: geoData,
          });

          // Send a notification about the rate limit breach
          await sendNotification(
            "Rate Limit Exceeded",
            `IP ${ip} (${geoInfo}) has exceeded the allowed request limit.`
          );

          return res
            .status(429)
            .json({ message: "Too many requests, please try again later." });
        }
      } else {
        // Reset counter after the time window expires
        rateLimitStore[ip] = { count: 1, startTime: now };
      }
    }
    // --- End Rate Limiting ---

    // --- Token Protection ---
    const accessToken = req.cookies?.jwt;
    if (!accessToken) {
      return res.status(401).json({ message: "No access token found" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid access token" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
    // --- End Token Protection ---
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid access token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access Denied - Admin only route" });
  }
};
