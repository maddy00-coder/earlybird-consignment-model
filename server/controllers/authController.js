const User = require("../models/User");
const {
  generateResetToken,
  hashPassword,
  hashToken,
  verifyPassword,
} = require("../utils/security");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    business: user.business,
    email: user.email,
    phone: user.phone,
    gst: user.gst,
    address: user.address,
    owner: user.owner || user.name,
  };
}

function isValidEmail(email = "") {
  return /\S+@\S+\.\S+/.test(email);
}

async function signup(req, res) {
  try {
    const { name, business, email, password } = req.body;

    if (!name?.trim() || !business?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name: name.trim(),
      business: business.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(password.trim()),
      owner: name.trim(),
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create your account right now." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Please enter email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !verifyPassword(password.trim(), user.passwordHash)) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      message: "Login successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to sign you in right now." });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email?.trim() || !isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.json({
        message: "If that email exists, a reset link has been prepared.",
      });
    }

    const resetToken = generateResetToken();
    user.resetPasswordTokenHash = hashToken(resetToken);
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    return res.json({
      message: "Reset link generated successfully.",
      resetUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to process forgot password right now." });
  }
}

async function resetPassword(req, res) {
  try {
    const { email, token, password } = req.body;

    if (!email?.trim() || !token?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email, token, and password are required." });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordTokenHash: hashToken(token.trim()),
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or has expired." });
    }

    user.passwordHash = hashPassword(password.trim());
    user.resetPasswordTokenHash = "";
    user.resetPasswordExpires = null;
    await user.save();

    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to reset password right now." });
  }
}

module.exports = {
  forgotPassword,
  login,
  resetPassword,
  signup,
};
