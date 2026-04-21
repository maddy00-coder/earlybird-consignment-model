import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LockKeyhole } from "lucide-react";

import { api } from "../utils/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getInputStyle = (field) => ({
    width: "100%",
    height: "48px",
    padding: "0 16px",
    marginBottom: "10px",
    borderRadius: "14px",
    border:
      focusedField === field
        ? "1px solid rgba(124, 46, 40, 0.65)"
        : "1px solid rgba(124, 46, 40, 0.22)",
    background: "var(--input-bg)",
    color: "var(--input-text)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow:
      focusedField === field
        ? "0 0 0 4px rgba(124, 46, 40, 0.12)"
        : "none",
  });

  const handleSubmit = async () => {
    if (!token || !email) {
      toast.error("Reset link is missing required details.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please complete both password fields.");
      return;
    }

    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/auth/reset-password", {
        email,
        token,
        password,
      });

      toast.success(response.message || "Password updated successfully.");
      navigate("/auth");
    } catch (error) {
      toast.error(error.message || "Unable to reset password.");
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
              <LockKeyhole size={28} strokeWidth={2.1} />
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
              Reset Password
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
              Set a new password for {email || "your account"}.
            </p>

            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              style={getInputStyle("password")}
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => setFocusedField("")}
              style={{ ...getInputStyle("confirm"), marginBottom: "12px" }}
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
              {submitting ? "Saving..." : "Save new password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
