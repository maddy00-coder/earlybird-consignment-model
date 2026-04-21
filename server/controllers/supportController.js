const SupportTicket = require("../models/SupportTicket");

async function createSupportTicket(req, res) {
  try {
    const { userId, subject, category, message } = req.body;

    if (!subject?.trim() || !message?.trim() || !category?.trim()) {
      return res.status(400).json({ message: "Please complete subject, category, and message." });
    }

    const ticket = await SupportTicket.create({
      userId: userId || null,
      subject: subject.trim(),
      category: category.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Support ticket created successfully.",
      ticketId: ticket._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to submit the support ticket right now." });
  }
}

module.exports = {
  createSupportTicket,
};
