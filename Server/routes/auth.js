import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
const router = Router()

router.post("/signup", async (req, res) => {
  const {fullName, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. You can log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      id: newUser._id, 
      fullName:newUser.fullName,
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

export default router
