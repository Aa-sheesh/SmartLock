import mongoose from "mongoose";

const IntrusionSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    trim: true,
  },
  userAgent: {
    type: String,
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ["failed_login", "suspicious_activity", "brute_force", "other"],
    default: "suspicious_activity",
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
  // Geolocation data for future analysis
  geo: {
    city: { type: String, trim: true },
    region: { type: String, trim: true },
    country: { type: String, trim: true },
    // Optionally include latitude and longitude
    lat: { type: Number },
    lon: { type: Number },
  },
});

const Intrusion = mongoose.model("Intrusion", IntrusionSchema);
export default Intrusion;
