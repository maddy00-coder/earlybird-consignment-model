const mongoose = require("mongoose");
const User = require("../models/User");

async function getProfile(req, res) {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id." });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: "Profile not found." });
    }

    return res.json({
      profile: {
        id: user._id,
        name: user.business,
        email: user.email,
        phone: user.phone,
        gst: user.gst,
        address: user.address,
        owner: user.owner || user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load profile right now." });
  }
}

async function updateProfile(req, res) {
  try {
    const { userId } = req.params;
    const { name, email, phone, gst, address, owner } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id." });
    }

    if (!name?.trim() || !email?.trim() || !owner?.trim()) {
      return res.status(400).json({ message: "Business name, email, and owner are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Profile not found." });
    }

    user.business = name.trim();
    user.email = email.toLowerCase().trim();
    user.phone = phone?.trim() || "";
    user.gst = gst?.trim() || "";
    user.address = address?.trim() || "";
    user.owner = owner.trim();

    await user.save();

    return res.json({
      message: "Profile updated successfully.",
      profile: {
        id: user._id,
        name: user.business,
        email: user.email,
        phone: user.phone,
        gst: user.gst,
        address: user.address,
        owner: user.owner,
      },
      user: {
        id: user._id,
        name: user.name,
        business: user.business,
        email: user.email,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "That email address is already in use." });
    }

    return res.status(500).json({ message: "Unable to save profile right now." });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
