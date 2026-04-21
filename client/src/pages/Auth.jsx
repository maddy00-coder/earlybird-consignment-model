import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LockKeyhole } from "lucide-react";

import { api } from "../utils/api";
import { setStoredUser } from "../utils/auth";

export default function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email & password");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      setStoredUser(response.user);
      toast.success(response.message || "Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Unable to sign in.");
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
          minHeight: "100%",
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            maxHeight: "90vh",
          }}
        >
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
              maxHeight: "90vh",
              overflow: "hidden",
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
              Welcome Back
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
              Sign in to manage your business
            </p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                marginBottom: "10px",
                borderRadius: "14px",
                border: emailFocused
                  ? "1px solid rgba(124, 46, 40, 0.65)"
                  : "1px solid rgba(124, 46, 40, 0.22)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: emailFocused
                  ? "0 0 0 4px rgba(124, 46, 40, 0.12)"
                  : "none",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                marginBottom: "8px",
                borderRadius: "14px",
                border: passwordFocused
                  ? "1px solid rgba(124, 46, 40, 0.65)"
                  : "1px solid rgba(124, 46, 40, 0.22)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: passwordFocused
                  ? "0 0 0 4px rgba(124, 46, 40, 0.12)"
                  : "none",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "12px",
              }}
            >
              <span
                onClick={() => navigate("/forgot-password")}
                style={{
                  color: "var(--gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </span>
            </div>

            <button
              onClick={handleLogin}
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
                transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 16px 28px rgba(124, 46, 40, 0.26)";
                e.currentTarget.style.filter = "brightness(0.94)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(124, 46, 40, 0.22)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>

            <p
              className="auth-footer"
              style={{
                textAlign: "center",
                color: "var(--muted)",
                margin: "14px 0 8px",
                fontSize: "0.92rem",
              }}
            >
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Sign Up
              </span>
            </p>

            <small
              style={{
                display: "block",
                textAlign: "center",
                color: "var(--muted)",
                lineHeight: 1.45,
                fontSize: "0.84rem",
              }}
            >
              
              First order = 50% discount automatically applied
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
