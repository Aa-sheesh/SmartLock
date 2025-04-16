import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import Intrusion from "../models/intrusion.model.js";
import crypto from "crypto";
import { logIntrusionToBlockchain } from "../lib/blockchain.js"; // ⬅️ Smart contract logger

// 🔐 Helper function for intrusion logging (DB + Blockchain)
async function logIntrusion(req, eventType, additionalInfo) {
  const intrusionData = {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    eventType,
    additionalInfo,
  };

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(intrusionData))
    .digest("hex");

  await Intrusion.create(intrusionData);                        // 📥 MongoDB log
  await logIntrusionToBlockchain(intrusionData.ipAddress, hash); // ⛓️ Blockchain log
}

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    });

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // 🚨 Email not found
    if (!user) {
      await logIntrusion(req, "failed_login", "Login attempt with non-existent email");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // ❌ Incorrect password
    if (!isPasswordCorrect) {
      await logIntrusion(req, "failed_login", "Incorrect password attempt");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // ✅ Successful login
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Error in get profile controller",
      error: error.message,
    });
  }
};
