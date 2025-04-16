import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

// 🛡️ Routes
import authRoutes from "./routes/auth.route.js";
import intrusionRoutes from "./routes/intrusion.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import userActivityRoutes from "./routes/userActivity.route.js";
import testRoutes from "./routes/test.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// 🔧 Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// 🌐 Route Bindings
app.use("/api/auth", authRoutes);
app.use("/api/intrusions", intrusionRoutes); // Includes POST /report and GET /
app.use("/api", dashboardRoutes);            // Includes /api/alerts and /api/metrics
app.use("/api/user", userActivityRoutes);
app.use("/api/test", testRoutes);

// 🚀 Server + DB
app.listen(PORT, () => {
  console.log(`✅ Server is running at port ${PORT}`);
  connectDB();
});
