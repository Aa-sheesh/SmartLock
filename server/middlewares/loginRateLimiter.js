// server/middlewares/loginRateLimiter.js
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum allowed login attempts per IP in this window
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
  handler: (req, res) => {
    // Calculate minutes remaining until reset
    const resetTime = req.rateLimit.resetTime
      ? Math.ceil((req.rateLimit.resetTime.getTime() - Date.now()) / 60000)
      : 15;
    const remaining = req.rateLimit.remaining; // Chances left (should be 0 if limit exceeded)

    res.status(429).json({
      message: `Too many login attempts. Please try again after ${resetTime} minute(s).`,
    });
  },
});
