const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user.model.js");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const accessToken = jwt.sign(
      { id: user._id ,isAdmin:user.isAdmin},
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
  )

  res.status(200)
      .json({
          message: "Login Success",
          success: true,
          accessToken,
          email,
          name: user.username,
          id: user._id
      })
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
});

module.exports = router;
