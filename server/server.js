import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import intrusionRoutes from "./routes/intrusion.route.js"; // Existing intrusion routes
import dashboardRoutes from "./routes/dashboard.route.js"; // New dashboard routes
import cookieParser from "cookie-parser";
import userActivityRoutes from "./routes/userActivity.route.js";
import testRoutes from "./routes/test.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/intrusions", intrusionRoutes); // Existing intrusion routes
app.use("/api", dashboardRoutes); // This mounts /api/alerts and /api/metrics
app.use("/api/user", userActivityRoutes);
app.use("/api/test", testRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});
