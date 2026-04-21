import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Moon, Search, ShoppingCart, Sun } from "lucide-react";

import { CartContext } from "../context/CartContext";
import { clearStoredUser } from "../utils/auth";
import Sidebar from "./Sidebar";

const getInitials = (name = "EarlyBird User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "EU";

export default function DashboardLayout({ theme = "light", toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")) || { name: "EarlyBird User" }, []);
  const [productSearch, setProductSearch] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const isProductsPage = location.pathname === "/dashboard/products";
  useEffect(() => {
    setShowMobileNav(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointer = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setShowMobileNav(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="eb-shell">
      <Sidebar isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} userName={user.name} />

      {showMobileNav ? (
        <button
          className="eb-sidebar-backdrop"
          type="button"
          onClick={() => setShowMobileNav(false)}
          aria-label="Close navigation"
        />
      ) : null}

      <main className="eb-main">
        <header className="eb-topbar">
          <div>
            <button
              className="eb-topbar__menu"
              type="button"
              onClick={() => setShowMobileNav(true)}
              aria-label="Open navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className="eb-topbar__actions">
            <button
              className="eb-icon-button eb-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isProductsPage ? (
              <label
                className="eb-search-field"
                htmlFor="dashboard-products-search"
                style={{
                  minWidth: 260,
                  maxWidth: 320,
                  padding: "11px 14px",
                  background: "rgba(255, 247, 242, 0.92)",
                }}
              >
                <Search size={16} />
                <input
                  id="dashboard-products-search"
                  type="search"
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                  placeholder="Search products"
                />
              </label>
            ) : null}

            <Link className="eb-cart-pill" to="/dashboard/cart">
              <ShoppingCart size={16} />
              <span>Cart</span>
              <strong>{cartCount}</strong>
            </Link>

            <div className="eb-dropdown" ref={notificationRef}>
              <button
                className="eb-icon-button"
                type="button"
                onClick={() => setShowNotifications((value) => !value)}
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>

              {showNotifications ? (
                <div className="eb-popover">
                  <strong>Recent activity</strong>
                  <p>Orders, delivery updates, and support alerts appear here.</p>
                </div>
              ) : null}
            </div>

            <div className="eb-dropdown" ref={profileRef}>
              <button
                className="eb-profile-chip"
                type="button"
                onClick={() => setShowProfileMenu((value) => !value)}
              >
                <span>{getInitials(user.name)}</span>
                <div>
                  <strong>{user.name}</strong>
                  <small>Store admin</small>
                </div>
              </button>

              {showProfileMenu ? (
                <div className="eb-popover eb-popover--profile">
                  <Link to="/dashboard/profile">Open profile</Link>
                  <button
                    type="button"
                    onClick={() => {
                      clearStoredUser();
                      navigate("/auth");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="eb-page-transition eb-page-content">
          <Outlet context={{ productSearch, setProductSearch }} />
        </section>
      </main>
    </div>
  );
}
