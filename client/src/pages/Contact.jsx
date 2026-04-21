import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "../utils/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [hovered, setHovered] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/contact", form);
      toast.success(response.message || "Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Unable to send your message");
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldStyle = (field, isTextarea = false) => ({
    width: "100%",
    minHeight: isTextarea ? "140px" : "52px",
    padding: isTextarea ? "14px 16px" : "0 16px",
    marginBottom: "14px",
    borderRadius: "14px",
    border:
      focusedField === field
        ? "1px solid rgba(124, 46, 40, 0.65)"
        : "1px solid rgba(124, 46, 40, 0.22)",
    background: "var(--input-bg)",
    boxShadow:
      focusedField === field
        ? "0 0 0 4px rgba(124, 46, 40, 0.12)"
        : "none",
    color: "var(--input-text)",
    outline: "none",
    resize: isTextarea ? "none" : "initial",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <div
      style={{
        height: "calc(100vh - 74px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80"
        alt="Warm workspace background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--contact-overlay)",
          backdropFilter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "clamp(28px, 8vw, 112px)",
          paddingRight: "24px",
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <div
            className="contact-card"
            style={{
              background: "var(--auth-card-bg)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: "20px",
              border: hovered
                ? "1px solid rgba(124, 46, 40, 0.22)"
                : "1px solid var(--border-strong)",
              boxShadow: hovered
                ? "0 16px 32px rgba(124, 46, 40, 0.14)"
                : "0 8px 25px rgba(0,0,0,0.1)",
              padding: "34px 30px 22px",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
              transition:
                "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
            }}
          >
            <div style={{ marginBottom: "22px" }}>
              <h2
                style={{
                  margin: 0,
                  color: "var(--gold)",
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "clamp(2rem, 3vw, 2.4rem)",
                  lineHeight: 1.05,
                }}
              >
                Contact Us
              </h2>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "var(--muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  maxWidth: "340px",
                }}
              >
                We’d love to hear from you. Let’s connect.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField("")}
                style={getFieldStyle("name")}
              />

              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                style={getFieldStyle("email")}
              />

              <textarea
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField("")}
                style={getFieldStyle("message", true)}
              ></textarea>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: "54px",
                  borderRadius: "14px",
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.85 : 1,
                  background: "var(--button-gradient)",
                  boxShadow: "0 12px 24px rgba(124, 46, 40, 0.22)",
                  transition: "transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.filter = "brightness(0.94)";
                  e.currentTarget.style.boxShadow = "0 16px 28px rgba(124, 46, 40, 0.26)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.filter = "brightness(1)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(124, 46, 40, 0.22)";
                }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
