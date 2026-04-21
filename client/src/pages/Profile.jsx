import { useState } from "react";
import { Edit2, Shield, Download, CheckCircle, Building2, User, Mail, Phone, MapPin, Calendar, Hash } from "lucide-react";

const profileData = {
  name: "Madeeha buiness",
  email: "business@earlybird.com",
  phone: "+91 963200134",
  ownerName: "maddy",
  businessType: "Retail & Wholesale",
  gst: "22AAAAA0000A1Z",
  address: "123, Business Park, Andheri East, Mumbai - 400093",
  memberSince: "January 2024",
};

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profileData);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ icon: Icon, label, field, half }) => (
    <div style={{ marginBottom: "1.25rem", gridColumn: half ? "span 1" : "span 2" }}>
      <label style={{ fontSize: 11, color: "#aaa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <Icon size={12} /> {label}
      </label>
      {editing ? (
        <input
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          style={{
            width: "100%", padding: "10px 14px", border: "1.5px solid #FF572244",
            borderRadius: 8, fontSize: 14, color: "#1a1a1a", outline: "none", boxSizing: "border-box",
            background: "#fff8f5",
          }}
        />
      ) : (
        <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0, fontWeight: 500 }}>{form[field]}</p>
      )}
    </div>
  );

  return (
    <div style={{ padding: "2rem", maxWidth: 860, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FF5722 0%, #FF8A65 100%)",
          borderRadius: 18,
          padding: "2rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", right: 60, bottom: -50, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div
          style={{
            width: 72, height: 72, borderRadius: 16,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 800, color: "#fff",
            flexShrink: 0, backdropFilter: "blur(4px)",
          }}
        >
          {form.name.charAt(0)}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{form.name}</h1>
            <span
              style={{
                background: "rgba(255,255,255,0.25)", borderRadius: 20,
                padding: "3px 10px", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 4
              }}
            >
              <CheckCircle size={11} /> Verified Business
            </span>
          </div>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>{form.email}</p>
          <p style={{ margin: "2px 0 0", opacity: 0.7, fontSize: 13 }}>Member since {form.memberSince}</p>
        </div>
      </div>

      {saved && (
        <div
          style={{
            background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 10,
            padding: "12px 18px", marginBottom: "1.5rem", fontSize: 14,
            color: "#2e7d32", display: "flex", alignItems: "center", gap: 8
          }}
        >
          <CheckCircle size={16} /> Profile saved successfully!
        </div>
      )}

      {/* Business Info */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #f0f0f0",
          borderRadius: 16,
          padding: "1.75rem",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Business Information</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#fff8f5", border: "1px solid #FF572233",
                color: "#FF5722", borderRadius: 8, padding: "8px 16px",
                cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              <Edit2 size={13} /> Edit Profile
            </button>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
          <Field icon={Building2} label="Business Name" field="name" half />
          <Field icon={Hash} label="Business Type" field="businessType" half />
          <Field icon={User} label="Owner Name" field="ownerName" half />
          <Field icon={Hash} label="GST Number" field="gst" half />
          <Field icon={Mail} label="Email Address" field="email" half />
          <Field icon={Phone} label="Phone Number" field="phone" half />
          <Field icon={MapPin} label="Business Address" field="address" half />
          <Field icon={Calendar} label="Member Since" field="memberSince" half />
        </div>

        {editing && (
          <div style={{ display: "flex", gap: 10, marginTop: "0.5rem" }}>
            <button
              onClick={handleSave}
              style={{
                background: "#FF5722", color: "#fff", border: "none",
                borderRadius: 8, padding: "10px 24px",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => { setForm(profileData); setEditing(false); }}
              style={{
                background: "#f5f5f5", color: "#555", border: "none",
                borderRadius: 8, padding: "10px 20px",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#fff", border: "1px solid #e5e5e5",
            borderRadius: 10, padding: "12px 22px",
            fontWeight: 600, fontSize: 13, cursor: "pointer", color: "#1a1a1a",
          }}
        >
          <Shield size={15} color="#FF5722" /> Security Settings
        </button>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#FF5722", color: "#fff",
            border: "none", borderRadius: 10, padding: "12px 22px",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}
        >
          <Download size={15} /> Download Report
        </button>
      </div>
    </div>
  );
}
