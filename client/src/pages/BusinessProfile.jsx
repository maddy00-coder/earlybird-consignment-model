import { useEffect, useState } from "react";
import { BadgeCheck, Building2, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "../utils/api";
import { getStoredUser, setStoredUser } from "../utils/auth";

const STORAGE_KEY = "earlybird_profile";

const defaultProfile = {
  name: "Prime Basket Retail",
  email: "admin@primebasketretail.com",
  phone: "+91 98190 24751",
  gst: "27AAPFB4582C1Z8",
  address: "402 Trade Square, Baner Road, Pune 411045",
  owner: "Aarav Mehta",
};

function Field({ label, icon: Icon, value, editing, onChange }) {
  return (
    <div className="eb-field">
      <label>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={16} style={{ position: "absolute", left: 14, top: 15, color: "var(--eb-muted)" }} />
        <input
          className="eb-input eb-business-field__input"
          value={value}
          disabled={!editing}
          onChange={onChange}
          style={{
            paddingLeft: 42,
            background: editing ? "var(--eb-surface-strong)" : "var(--eb-surface)",
            color: "var(--eb-text)",
            WebkitTextFillColor: "var(--eb-text)",
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
}

export default function BusinessProfile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUser = getStoredUser();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const migratedProfile =
        parsed?.name === "Madhu Chicken Centre"
          ? { ...defaultProfile, ...parsed, name: defaultProfile.name, email: defaultProfile.email, owner: defaultProfile.owner, phone: defaultProfile.phone, gst: defaultProfile.gst, address: defaultProfile.address }
          : parsed;

      setProfile(migratedProfile);
    }
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/profile/${currentUser.id}`);
        if (response?.profile) {
          setProfile(response.profile);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.profile));
        }
      } catch {
        // Keep the existing local data as a fallback.
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser?.id]);

  const handleSave = async () => {
    if (!currentUser?.id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setEditing(false);
      toast.success("Profile details saved.");
      return;
    }

    try {
      const response = await api.put(`/api/profile/${currentUser.id}`, profile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.profile));
      setStoredUser({
        ...(currentUser || {}),
        ...(response.user || {}),
        phone: response.profile.phone,
        address: response.profile.address,
      });
      setProfile(response.profile);
      setEditing(false);
      toast.success(response.message || "Profile details saved.");
    } catch (error) {
      toast.error(error.message || "Unable to save profile.");
    }
  };

  if (loading) {
    return <div className="eb-skeleton eb-skeleton--chart" />;
  }

  return (
    <>
      <section className="eb-profile-banner">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div className="eb-avatar">{profile.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <div className="eb-verification">
              <BadgeCheck size={16} />
              Verified business
            </div>
            <h2 style={{ marginTop: 14 }}>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <p style={{ marginBottom: 10 }}>Account owner</p>
          <strong>{profile.owner}</strong>
          <p style={{ marginTop: 8, marginBottom: 0 }}>Retail and wholesale merchant profile</p>
        </div>
      </section>

      <div className="eb-grid eb-grid--profile" style={{ marginTop: 20 }}>
        <article className="eb-card">
          <div className="eb-graph-card__header">
            <div>
              <h3>Business details</h3>
              <p>Maintain your verified merchant information and keep store records accurate across your dashboard.</p>
            </div>
            {editing ? (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="eb-secondary-button" type="button" onClick={() => setEditing(false)}>Cancel</button>
                <button className="eb-primary-button" type="button" onClick={handleSave}>
                  <Save size={16} />
                  Save changes
                </button>
              </div>
            ) : (
              <button className="eb-primary-button" type="button" onClick={() => setEditing(true)}>Edit profile</button>
            )}
          </div>

          <div className="eb-profile-grid" style={{ marginTop: 18 }}>
            <Field label="Business name" icon={Building2} value={profile.name} editing={editing} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
            <Field label="Owner" icon={UserRound} value={profile.owner} editing={editing} onChange={(event) => setProfile({ ...profile, owner: event.target.value })} />
            <Field label="Email" icon={Mail} value={profile.email} editing={editing} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
            <Field label="Phone" icon={Phone} value={profile.phone} editing={editing} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />
            <Field label="GST" icon={BadgeCheck} value={profile.gst} editing={editing} onChange={(event) => setProfile({ ...profile, gst: event.target.value })} />
            <Field label="Address" icon={MapPin} value={profile.address} editing={editing} onChange={(event) => setProfile({ ...profile, address: event.target.value })} />
          </div>
        </article>

        <article className="eb-card">
          <h3>Profile highlights</h3>
          <p>A concise snapshot of the business information most relevant to operations and trust.</p>

          <div className="eb-highlight-list" style={{ marginTop: 18 }}>
            <div className="eb-highlight-item">
              <BadgeCheck size={18} color="var(--eb-accent)" />
              <div>
                <strong>Verification status</strong>
                <p>Business identity and GST documentation verified</p>
              </div>
            </div>
            <div className="eb-highlight-item">
              <Building2 size={18} color="var(--eb-accent)" />
              <div>
                <strong>Business category</strong>
                <p>Multi-category retail and wholesale supply</p>
              </div>
            </div>
            <div className="eb-highlight-item">
              <Mail size={18} color="var(--eb-accent)" />
              <div>
                <strong>Primary business contact</strong>
                <p>{profile.email}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
