import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import geoip from "geoip-lite";
import { sendNotification } from "../lib/mailer.js";
import Intrusion from "../models/intrusion.model.js";

// In-memory rate limiter store (for demonstration purposes)
const rateLimitStore = {};
const MAX_REQUESTS = 5; // Maximum allowed requests per IP in the window for non-exempt endpoints
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export const protectRoute = async (req, res, next) => {
  try {
    // --- Token Protection ---
    const accessToken = req.cookies?.jwt;
    if (!accessToken) {
      return res.status(401).json({ message: "No access token found" });
    }

    let decoded, user;
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized - Invalid access token" });
      }
      req.user = user;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access token expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
    // --- End Token Protection ---

    // --- Exempt Certain Endpoints from Rate Limiting ---
    const url = req.originalUrl;
    // Exempt if user is admin OR if the endpoint is for user-specific data (profile or activity)
    if (
      user.role === "admin" ||
      url.startsWith("/api/user") ||
      url === "/api/auth/profile"
    ) {
      return next();
    }
    // --- End Exemption ---

    // --- Rate Limiting for Non-Exempt Endpoints ---
    const ip = req.ip;
    const now = Date.now();
    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = { count: 1, startTime: now };
    } else {
      let data = rateLimitStore[ip];
      if (now - data.startTime < WINDOW_MS) {
        data.count++;
        if (data.count > MAX_REQUESTS) {
          const resetTime = Math.ceil((WINDOW_MS - (now - data.startTime)) / 60000);
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
            additionalInfo: `Exceeded allowed request limit. Try again after ${resetTime} minute(s).`,
            geo: geoData,
          });

          // Send a notification about the rate limit breach
          try {
            await sendNotification(
              "Rate Limit Exceeded",
              `IP ${ip} (${geoInfo}) has exceeded the allowed request limit. Please try again after ${resetTime} minute(s).`
            );
          } catch (notifyErr) {
            console.error("Notification error:", notifyErr.message);
          }

          return res.status(429).json({ message: `Too many requests, please try again after ${resetTime} minute(s).` });
        }
      } else {
        // Reset counter after the time window expires
        rateLimitStore[ip] = { count: 1, startTime: now };
      }
    }
    // --- End Rate Limiting ---

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid access token" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied - Admin only route" });
  }
};
