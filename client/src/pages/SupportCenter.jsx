import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone, SendHorizonal, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../utils/api";
import { getStoredUser } from "../utils/auth";

const FAQS = [
  {
    question: "How do I track an order after it is shipped?",
    answer: "Open Orders, select the order row, and use the tracking details from the shipment provider once it moves to Shipped.",
  },
  {
    question: "Can I request a GST invoice for every order?",
    answer: "Yes. GST invoices are generated for business orders and can be shared from your account records once the order is confirmed.",
  },
  {
    question: "How long does EarlyBird support take to respond?",
    answer: "Phone and WhatsApp are near real-time during business hours, while tickets and email are typically answered within 24 hours.",
  },
];

const CHANNELS = [
  { title: "Phone", icon: Phone, detail: "+91 1800 123 4567", note: "Mon to Sat, 9 AM to 9 PM", action: "Call now", href: "tel:+9118001234567", color: "#ea580c", background: "#fff1e9" },
  { title: "Email", icon: Mail, detail: "support@earlybird.com", note: "Replies within 24 hours", action: "Send email", href: "mailto:support@earlybird.com", color: "#b45309", background: "#fff7e8" },
  { title: "WhatsApp", icon: MessageCircle, detail: "+91 98765 43210", note: "Fastest way to reach us", action: "Open chat", href: "https://wa.me/919876543210", color: "#15803d", background: "#ecfdf3" },
  { title: "Live Chat", icon: Sparkles, detail: "Available inside the dashboard", note: "Best for order or onboarding questions", action: "Start now", href: "#", color: "#7c2d12", background: "#fff4ef" },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="eb-faq-item">
      <button className="eb-faq-button" type="button" onClick={() => setOpen((value) => !value)}>
        <strong>{item.question}</strong>
        <ChevronDown size={18} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
      </button>
      {open ? <div className="eb-faq-answer"><p>{item.answer}</p></div> : null}
    </div>
  );
}

export default function SupportCenter() {
  const [form, setForm] = useState({ subject: "", category: "Order Issue", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.subject.trim() || !form.message.trim()) {
      toast.error("Please complete the subject and message before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const currentUser = getStoredUser();
      const response = await api.post("/api/support/tickets", {
        userId: currentUser?.id || null,
        ...form,
      });

      toast.success(response.message || "Support ticket drafted successfully.");
      setForm({ subject: "", category: "Order Issue", message: "" });
    } catch (error) {
      toast.error(error.message || "Unable to submit support ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="eb-contact-grid">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;

          return (
            <article key={channel.title} className="eb-card eb-contact-card">
              <div className="eb-contact-card__icon" style={{ background: channel.background, color: channel.color }}>
                <Icon size={22} />
              </div>
              <div>
                <h3>{channel.title}</h3>
                <p>{channel.detail}</p>
                <small>{channel.note}</small>
              </div>
              <div className="eb-contact-card__footer">
                <a className="eb-primary-button" href={channel.href} style={{ textDecoration: "none", background: channel.color }}>
                  {channel.action}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="eb-grid eb-grid--two" style={{ marginTop: 20 }}>
        <article className="eb-card">
          <div className="eb-graph-card__header">
            <div>
              <h3>Raise a ticket</h3>
              <p>Collect the basics and keep the form lightweight.</p>
            </div>
            <span className="eb-pill eb-pill--neutral">
              <SendHorizonal size={14} />
              24h SLA
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <div className="eb-ticket-grid">
              <div className="eb-field">
                <label htmlFor="ticket-subject">Subject</label>
                <input id="ticket-subject" className="eb-input" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Order stuck in pending state" />
              </div>
              <div className="eb-field">
                <label htmlFor="ticket-category">Category</label>
                <select id="ticket-category" className="eb-select" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                  <option>Order Issue</option>
                  <option>Payment Problem</option>
                  <option>Refund Request</option>
                  <option>Account Help</option>
                  <option>Technical Bug</option>
                </select>
              </div>
              <div className="eb-field eb-field--full">
                <label htmlFor="ticket-message">Message</label>
                <textarea id="ticket-message" className="eb-textarea" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us what happened, what you expected, and any order references we should review." />
              </div>
            </div>

            <button className="eb-primary-button" type="submit" style={{ marginTop: 18 }} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit ticket"}
            </button>
          </form>
        </article>

        <article className="eb-card">
          <h3>Frequently asked questions</h3>
          <p>Use the accordion for quick answers before raising a ticket.</p>
          <div style={{ marginTop: 18 }}>
            {FAQS.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
