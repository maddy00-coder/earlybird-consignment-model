import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

import { api } from "../utils/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/auth/forgot-password", { email });

      toast.success(response.message || "Reset link generated successfully.");

      if (response.resetUrl) {
        const resetUrl = new URL(response.resetUrl);
        navigate(`${resetUrl.pathname}${resetUrl.search}`);
      }
    } catch (error) {
      toast.error(error.message || "Unable to process forgot password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 74px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600"
        alt="Ecommerce business workspace"
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
          background: "var(--auth-overlay)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div
            className="auth-card"
            style={{
              background: "var(--auth-card-bg)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: "20px",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              padding: "26px 26px 18px",
            }}
          >
            <div
              className="auth-icon"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "18px",
                margin: "0 auto 14px",
                display: "grid",
                placeItems: "center",
                background: "var(--button-gradient)",
                boxShadow: "0 14px 28px rgba(124, 46, 40, 0.18)",
                color: "#fff",
              }}
            >
              <Mail size={28} />
            </div>

            <h2
              style={{
                margin: 0,
                textAlign: "center",
                color: "var(--gold)",
                fontFamily: '"Playfair Display", serif',
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              Forgot Password
            </h2>

            <p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                margin: "6px 0 18px",
                fontSize: "0.88rem",
                lineHeight: 1.5,
              }}
            >
              Enter your registered email to continue with password reset.
            </p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                marginBottom: "12px",
                borderRadius: "14px",
                border: focused
                  ? "1px solid rgba(124, 46, 40, 0.65)"
                  : "1px solid rgba(124, 46, 40, 0.22)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: focused
                  ? "0 0 0 4px rgba(124, 46, 40, 0.12)"
                  : "none",
              }}
            />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "14px",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.85 : 1,
                background: "var(--button-gradient)",
                boxShadow: "0 12px 24px rgba(124, 46, 40, 0.22)",
              }}
            >
              {submitting ? "Preparing reset link..." : "Continue"}
            </button>

            <p
              className="auth-footer"
              style={{
                textAlign: "center",
                color: "var(--muted)",
                margin: "14px 0 0",
                fontSize: "0.92rem",
              }}
            >
              Remembered your password?{" "}
              <span
                onClick={() => navigate("/auth")}
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
