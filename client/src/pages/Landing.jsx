import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import HeroCarousel from "../components/HeroCarousel";

const products = [
  {
    name: "Hoodies",
    price: "₹1200",
    img: "https://blinkstore.in/wp-content/uploads/sites/9/2024/01/list-of-different-types-of-hoodies-1024x538.webp",
  },
  {
    name: "Organic Face Cream",
    price: "₹899",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
  },
  {
    name: "Laptop overnightner bag",
    price: "₹1299",
    img: "https://www.bing.com/th?id=OPAC.9q7fUTVMHAxZ7w474C474&o=5&pid=21.1&w=140&h=163&rs=1&qlt=100&dpr=1&o=2&c=8&pcl=f5f5f5",
  },
  {
    name: "Self-Care Products",
    price: "₹799",
    img: "https://blinkstore.in/wp-content/uploads/sites/9/2024/07/Skincare-Products-1024x538.webp",
  },
  {
    name: "Art Supplies",
    price: "₹699",
    img: "https://blinkstore.in/wp-content/uploads/sites/9/2024/08/Art-Supplies-1024x512.webp",
  },
  {
    name: "Tote Bags",
    price: "₹599",
    img: "https://blinkstore.in/wp-content/uploads/sites/9/2024/04/Tote-Bags-1024x538.webp",
  },
];

const videos = [
  "https://www.youtube.com/embed/y6Hy12uX9Fw",
  "https://www.youtube.com/embed/KoMnHjxzW98",
  "https://www.youtube.com/embed/VMoN3o786ms",
  "https://www.youtube.com/embed/KzIqWFKwHs8",
];

export default function Landing() {
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const handleSubscribe = () => {
    if (!subscriberEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Thanks for subscribing!");
    setSubscriberEmail("");
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>

      {/* HERO */}
      <HeroCarousel />
      {/* 🔥 OFFER BANNER */}
<div className="offer-banner" style={{
  background: "color-mix(in srgb, var(--gold) 72%, transparent)",
  color: "white",
  textAlign: "center",
  padding: "20px"
}}>
  <h2>🎉 First Order 50% OFF</h2>
  <p>Start your business with zero risk today</p>

  <Link to="/auth">
    <button style={{
      marginTop: "10px",
      background: "var(--surface-strong)",
      padding: "10px 20px",
      borderRadius: "8px",
      color: "var(--gold)"
    }}>
      Register Now
    </button>
  </Link>
</div>
      

      {/* WHY */}
      <div className="section">
        <h2>Why Choose <span style={{ color: "#610e08ff" }}>EarlyBird</span></h2>
        <div className="grid">
          <div className="card"><h3>Zero Risk</h3><p>Start without heavy investment</p></div>
          <div className="card"><h3>High Margins</h3><p>Earn better profits</p></div>
          <div className="card"><h3>Trusted Brands</h3><p>Verified suppliers only</p></div>
          <div className="card"><h3>Easy Ordering</h3><p>Simple and smooth wholesale buying experience</p></div>
        </div>
      </div>

      {/* TRENDING */}
      <div className="section">
        <h2>Trending Products</h2>
        <div style={{ display: "flex", overflowX: "auto", gap: "20px", padding: "20px" }}>
          {products.map((p, i) => (
            <div key={i} className="card product-card" style={{ minWidth: "250px" }}>
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </div>

    

      {/* VIDEOS */}
      <div className="section">
        <h2>See How It Works</h2>
        <div className="video-grid">
          {videos.map((v, i) => (
            <iframe key={i} src={v} title="video" allowFullScreen />
          ))}
        </div>
      </div>

      <div className="section steps-section">
  <h2>Get Started in <span>4 Steps</span></h2>

  <div className="steps-container">

    {[
      { num: "1", title: "Sign Up → Create Account" },
      { num: "2", title: "Verify → Complete KYC" },
      { num: "3", title: "Order → Buy Products" },
      { num: "4", title: "Earn → Sell & Profit" },
    ].map((step, i) => (
      <div className="step-card" key={i}>
        <div className="circle">{step.num}</div>
        <h3>{step.title}</h3>
      </div>
    ))}

  </div>
</div>

      {/* TRUST SECTION */}
      <div className="section light">
        <h2>Why People Trust Us</h2>

        <div className="trust-grid">
          <div className="trust-card">
            <h3>10,000+</h3>
            <p>Active Sellers</p>
          </div>
          <div className="trust-card">
            <h3>₹50L+</h3>
            <p>Transactions</p>
          </div>
          <div className="trust-card">
            <h3>500+</h3>
            <p>Suppliers</p>
          </div>
        </div>
      </div>

      
      {/* NEWSLETTER */}
      <div className="section">
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "36px 32px",
            borderRadius: "24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-soft)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 style={{ margin: 0 }}>Stay Updated</h2>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: "560px",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Get updates on new products, offers, and business tips.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <input
              type="email"
              placeholder="Enter email"
              value={subscriberEmail}
              onChange={(event) => setSubscriberEmail(event.target.value)}
              style={{
                minWidth: "min(100%, 380px)",
                flex: "1 1 320px",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--input-bg)",
                color: "var(--input-text)",
                outline: "none",
                boxShadow: "0 10px 22px rgba(90,67,48,0.06)",
              }}
            />

            <button
              type="button"
              onClick={handleSubscribe}
              style={{
                minWidth: "150px",
                padding: "14px 22px",
                borderRadius: "14px",
                background: "var(--button-gradient)",
                boxShadow: "0 12px 24px rgba(124, 46, 40, 0.18)",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* PREMIUM FOOTER */}
      <footer className="premium-footer">

        <div className="footer-grid">

          <div>
            <h2 className="logo">Early<span>Bird</span></h2>
            <p>India’s fastest growing B2B platform</p>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="socials">
              <span>📷</span>
              <span>▶️</span>
              <span>📘</span>
              <span>🐦</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 EarlyBird. All rights reserved.
        </div>

      </footer>

    </div>
  );
}
