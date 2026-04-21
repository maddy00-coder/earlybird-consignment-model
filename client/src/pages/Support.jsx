import { useState } from "react";
import { Phone, Mail, MessageCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  { q: "How do I track my order?", a: "Go to My Orders → select any order → click 'Track Shipment'. You'll get real-time updates via SMS and email." },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for most products. Perishables and bulk orders are non-returnable. Raise a request from My Orders." },
  { q: "How do I get GST invoice for my purchase?", a: "GST invoices are auto-generated for every order. Download them from My Orders → Order Details → Download Invoice." },
  { q: "Can I modify my order after placing it?", a: "Orders can be modified within 2 hours of placement. After that, contact support and we'll do our best to help." },
  { q: "How long does delivery take?", a: "Metro cities: 1–2 days. Tier 2 & 3 cities: 3–5 days. Remote areas: 5–7 days. Bulk orders may take additional time." },
];

const CHANNELS = [
  {
    icon: Phone,
    title: "Phone Support",
    subtitle: "Talk to our team directly",
    detail: "+91 1800-123-4567",
    note: "Mon–Sat 9AM–9PM · Sun 10AM–6PM",
    action: "Call Now",
    color: "#FF5722",
    bg: "#fff8f5",
    onClick: () => window.open("tel:+911800123456"),
  },
  {
    icon: Mail,
    title: "Email Support",
    subtitle: "Response within 24 hours",
    detail: "support@earlybird.com",
    note: "business@earlybird.com",
    action: "Send Email",
    color: "#1565C0",
    bg: "#f0f4ff",
    onClick: () => window.open("mailto:support@earlybird.com"),
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    subtitle: "Instant messaging support",
    detail: "+91 98765 43210",
    note: "Typically replies in minutes",
    action: "Chat on WhatsApp",
    color: "#2E7D32",
    bg: "#f1fdf3",
    onClick: () => window.open("https://wa.me/919876543210"),
  },
  {
    icon: Zap,
    title: "Live Chat",
    subtitle: "Avg. response < 2 min",
    detail: "Available Now",
    note: "Mon–Sat 9AM–9PM",
    action: "Start Live Chat",
    color: "#6A1B9A",
    bg: "#faf0ff",
    onClick: () => alert("Live chat coming soon!"),
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #f0f0f0",
        padding: "14px 0",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>{q}</span>
        {open ? <ChevronUp size={16} color="#aaa" /> : <ChevronDown size={16} color="#aaa" />}
      </div>
      {open && (
        <p style={{ marginTop: 10, fontSize: 13, color: "#666", lineHeight: 1.7 }}>{a}</p>
      )}
    </div>
  );
}

export default function Support() {
  return (
    <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: "0.25rem" }}>Support Center</h1>
      <p style={{ color: "#888", marginBottom: "2rem", fontSize: 14 }}>We're here to help you 24/7. Reach us through any channel.</p>

      {/* Contact Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {CHANNELS.map((ch) => (
          <div
            key={ch.title}
            style={{
              background: ch.bg,
              border: `1px solid ${ch.color}22`,
              borderRadius: 14,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: ch.color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <ch.icon size={20} color={ch.color} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", margin: 0 }}>{ch.title}</p>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{ch.subtitle}</p>
            <p style={{ fontWeight: 700, fontSize: 14, color: ch.color, margin: "4px 0 0" }}>{ch.detail}</p>
            <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>{ch.note}</p>
            <button
              onClick={ch.onClick}
              style={{
                marginTop: 8, background: ch.color, color: "#fff",
                border: "none", borderRadius: 8, padding: "10px 0",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                width: "100%",
              }}
            >
              {ch.action}
            </button>
          </div>
        ))}
      </div>

      {/* Ticket Form */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #f0f0f0",
          borderRadius: 16,
          padding: "1.75rem",
          marginBottom: "2rem",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", marginBottom: "0.25rem" }}>Raise a Ticket</h2>
        <p style={{ fontSize: 13, color: "#888", marginBottom: "1.25rem" }}>Describe your issue and we'll get back to you within 24 hours.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: 12, color: "#888", fontWeight: 600, display: "block", marginBottom: 6 }}>Subject</label>
            <input
              placeholder="e.g. Order not received"
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e5e5", borderRadius: 8, fontSize: 13, boxSizing: "border-box", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#888", fontWeight: 600, display: "block", marginBottom: 6 }}>Category</label>
            <select
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e5e5", borderRadius: 8, fontSize: 13, background: "#fff", outline: "none" }}
            >
              <option>Order Issue</option>
              <option>Payment Problem</option>
              <option>Return / Refund</option>
              <option>Product Quality</option>
              <option>Account Issue</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: 12, color: "#888", fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
          <textarea
            rows={4}
            placeholder="Describe your issue in detail..."
            style={{
              width: "100%", padding: "10px 14px", border: "1px solid #e5e5e5",
              borderRadius: 8, fontSize: 13, resize: "vertical", boxSizing: "border-box", outline: "none"
            }}
          />
        </div>
        <button
          style={{
            background: "#FF5722", color: "#fff", border: "none",
            borderRadius: 8, padding: "11px 28px",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}
        >
          Submit Ticket
        </button>
      </div>

      {/* FAQ */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #f0f0f0",
          borderRadius: 16,
          padding: "1.75rem",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", marginBottom: "0.25rem" }}>Frequently Asked Questions</h2>
        <p style={{ fontSize: 13, color: "#888", marginBottom: "1rem" }}>Quick answers to common queries.</p>
        {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
      </div>
    </div>
  );
}