import { useState, useEffect, useRef } from "react";
import {
  Line,
  Bar,
  Doughnut
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  const [active, setActive] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef();
  const profileRef = useRef();

  // FETCH ORDERS
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  // CLICK OUTSIDE + ESC KEY
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowNotif(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // AUTO CLOSE WHEN SWITCHING TABS
  useEffect(() => {
    setShowNotif(false);
    setShowProfile(false);
  }, [active]);

  const menu = [
    { name: "Overview", icon: "📊" },
    { name: "Products", icon: "🛍️" },
    { name: "Orders", icon: "📦" },
    { name: "Cart", icon: "🛒" },
    { name: "Checkout", icon: "💳" },
    { name: "Analytics", icon: "📈" },
    { name: "Support", icon: "🎧" },
    { name: "Profile", icon: "👤" },
  ];

  const products = Array.from({ length: 20 }, (_, i) => ({
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 100,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  }));

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const salesData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Sales",
      data: [12000,19000,15000,22000,18000,25000],
      borderColor: "#d4af37",
      tension: 0.4
    }]
  };

  const categoryData = {
    labels: ["Food", "Beauty", "Wellness"],
    datasets: [{
      label: "Categories",
      data: [40, 35, 25],
      backgroundColor: ["#d4af37", "#6366f1", "#10b981"]
    }]
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>EarlyBird</h2>

        <div style={{
          background: "#796150ff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          color: "white"
        }}>
          <p>Welcome back,</p>
          <b>{user.name}</b>
        </div>

        {menu.map((item) => (
          <div
            key={item.name}
            className={`menu ${active === item.name ? "active" : ""}`}
            onClick={() => setActive(item.name)}
          >
            {item.icon} {item.name}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>

          {/* SEARCH */}
          {active === "Products" ? (
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />
          ) : <div></div>}

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

            {/* 🔔 NOTIFICATION */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <span
                onClick={() => setShowNotif(!showNotif)}
                style={{ cursor: "pointer" }}
              >
                🔔
              </span>

              <div style={{
                position: "absolute",
                top: "30px",
                right: 0,
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                width: "200px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
                opacity: showNotif ? 1 : 0,
                transform: showNotif ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.3s ease",
                pointerEvents: showNotif ? "auto" : "none"
              }}>
                <p>🛍️ New order placed</p>
                <p>📦 Order shipped</p>
              </div>
            </div>

            {/* 🛒 CART */}
            <div style={{ cursor: "pointer" }} onClick={() => setActive("Cart")}>
              🛒 ({cart.length})
            </div>

            {/* 👤 PROFILE */}
            <div ref={profileRef} style={{ position: "relative" }}>
              <div
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  background: "#d4af37",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                {user.name[0]}
              </div>

              <div style={{
                position: "absolute",
                top: "40px",
                right: 0,
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                width: "150px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
                opacity: showProfile ? 1 : 0,
                transform: showProfile ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.3s ease",
                pointerEvents: showProfile ? "auto" : "none"
              }}>
                <p>{user.name}</p>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/auth";
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>

        <h2>{active}</h2>

        {/* KEEP REST SAME */}
        {active === "Overview" && (
          <>
            <div className="cards">
              <div className="stat-card"><h4>Orders</h4><h2>{orders.length}</h2></div>
              <div className="stat-card"><h4>Revenue</h4><h2>₹50,000</h2></div>
              <div className="stat-card"><h4>Customers</h4><h2>120</h2></div>
              <div className="stat-card"><h4>Profit</h4><h2>₹20,000</h2></div>
            </div>

            <div className="grid-2">
              <div className="chart-box"><Line data={salesData} /></div>
              <div className="chart-box"><Doughnut data={categoryData} /></div>
            </div>
          </>
        )}

        {active === "Products" && (
          <div className="grid">
            {filteredProducts.map((p, i) => (
              <div className="card product-card" key={i} style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#ef4444",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}>
                  50% OFF
                </span>

                <img src={p.img} alt="product" />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            ))}
          </div>
        )}

        {active === "Cart" && (
          <div className="chart-box">
            <h3>Your Cart</h3>
            {cart.length === 0 ? <p>No items</p> :
              cart.map((item, i) => (
                <p key={i}>{item.name} - ₹{item.price}</p>
              ))
            }
          </div>
        )}

        {active === "Orders" && (
          <div className="chart-box">
            <table style={{ width: "100%" }}>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i}>
                    <td>{o.product}</td>
                    <td>₹{o.price}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
