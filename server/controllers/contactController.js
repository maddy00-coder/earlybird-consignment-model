const ContactMessage = require("../models/ContactMessage");

async function createContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Please complete all contact fields." });
    }

    await ContactMessage.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
    });

    return res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to send your message right now." });
  }
}

module.exports = {
  createContactMessage,
};
