const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User logged in", token });
};

const register = async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    let { name, email, password } = req.body; // Changed from username to name
    if (name && email && password) { // Simplified validation
      const person = new User({
        name: name, // Use name
        email: email,
        password: password,
      });
      await person.save();
      const token = jwt.sign({ userId: person._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res.status(201).json({ msg: "User registered successfully", token });
    } else {
      return res.status(400).json({ msg: "Please provide name, email, and password" });
    }
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please provide an email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    return res.status(200).json({ msg: "Password reset email sent (skipped for testing)" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Failed to process request", error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Please provide a new password" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};