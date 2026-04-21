import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  PackageSearch,
  Package,
  ShoppingBag,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", to: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Products", to: "/dashboard/products", icon: Package },
  { label: "Orders", to: "/dashboard/orders", icon: ShoppingBag },
  { label: "Cart", to: "/dashboard/cart", icon: ShoppingCart },
  { label: "Analytics", to: "/dashboard/analytics", icon: ChartNoAxesCombined },
  { label: "Support", to: "/dashboard/support", icon: CircleHelp },
  { label: "Profile", to: "/dashboard/profile", icon: UserRound },
];

const getInitials = (name = "EarlyBird User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "EU";

export default function DashboardShell({
  title,
  subtitle,
  children,
  cartCount = 0,
}) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "EarlyBird User" };
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

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
      <aside className={`eb-sidebar ${showMobileNav ? "is-open" : ""}`}>
        <div className="eb-sidebar__brand">
          <div className="eb-logo">EB</div>
          <div>
            <h1>EarlyBird</h1>
            <p>Commerce workspace</p>
          </div>
          <button
            className="eb-icon-button eb-sidebar__close"
            type="button"
            onClick={() => setShowMobileNav(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="eb-sidebar__welcome">
          <span className="eb-badge">Verified Store</span>
          <h2>{user.name}</h2>
          <p>Manage sales, customers, and operations from one polished workspace.</p>
        </div>

        <nav className="eb-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to === "/dashboard/overview" && location.pathname === "/dashboard");

            return (
              <Link
                key={item.to}
                className={`eb-nav__item ${isActive ? "is-active" : ""}`}
                to={item.to}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="eb-sidebar__footer">
          <div className="eb-sidebar__support">
            <PackageSearch size={18} />
            <div>
              <strong>Need help?</strong>
              <span>Support responds within 24 hours.</span>
            </div>
          </div>
        </div>
      </aside>

      {showMobileNav ? <button className="eb-sidebar-backdrop" type="button" onClick={() => setShowMobileNav(false)} /> : null}

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
            <div className="eb-page-heading">
              <p className="eb-page-heading__eyebrow">Dashboard</p>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          </div>

          <div className="eb-topbar__actions">
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
                      localStorage.removeItem("user");
                      window.location.href = "/auth";
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="eb-page-transition">{children}</section>
      </main>
    </div>
  );
}
