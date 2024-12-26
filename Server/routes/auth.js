import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. You can log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });
    const errorMsg = "Authentication failed. Email or password is incorrect.";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.fullName,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      accessToken,
      id: user._id,
      name: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

export default router;
