import { useState } from "react";

const stats = [
  { title: "10K+", description: "Active Retailers" },
  { title: "500+", description: "Products Available" },
  { title: "4.8", description: "Customer Rating" },
];

const values = [
  { title: "Our Mission", description: "Enable small businesses to scale faster." },
  { title: "Our Vision", description: "Build India's most trusted B2B platform." },
  { title: "Innovation", description: "Smart tech + supply chain optimization." },
];

function HoverCard({ children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card about-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minHeight: "190px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "32px 24px",
        border: hovered
          ? "1px solid var(--about-card-border-hover)"
          : "1px solid var(--about-card-border)",
        background: hovered
          ? "var(--about-card-bg-hover)"
          : "var(--about-card-bg)",
        boxShadow: hovered
          ? "var(--about-card-shadow-hover)"
          : "var(--about-card-shadow)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="section">
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2>
            About <span style={{ color: "var(--text)" }}>EarlyBird</span>
          </h2>

          <p style={{ maxWidth: "700px", margin: "20px auto 0", lineHeight: 1.8 }}>
            EarlyBird is a next-generation B2B marketplace designed to empower small
            retailers and entrepreneurs. We provide access to high-quality products
            at competitive wholesale prices, helping businesses grow faster with
            minimal risk.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "28px",
            marginTop: "44px",
            alignItems: "stretch",
          }}
        >
          {stats.map((item) => (
            <HoverCard key={item.title}>
              <h2 style={{ margin: 0 }}>{item.title}</h2>
              <p style={{ margin: "14px 0 0" }}>{item.description}</p>
            </HoverCard>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "28px",
            marginTop: "34px",
            alignItems: "stretch",
          }}
        >
          {values.map((item) => (
            <HoverCard key={item.title}>
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <p style={{ margin: "14px 0 0" }}>{item.description}</p>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
}
