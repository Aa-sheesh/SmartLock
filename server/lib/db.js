import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.MONGODB_URI);

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  try {
    console.log(`MongoDB connected:${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
