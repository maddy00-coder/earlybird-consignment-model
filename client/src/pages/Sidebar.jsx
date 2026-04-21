import { Link, useLocation } from "react-router-dom";
import {
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  Package,
  PackageSearch,
  ShoppingBag,
  ShoppingCart,
  UserRound,
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

export default function Sidebar({ isOpen, onClose, userName = "EarlyBird User" }) {
  const location = useLocation();

  return (
    <aside className={`eb-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="eb-sidebar__brand">
        <div className="eb-logo">EB</div>
        <div>
          <h1>EarlyBird</h1>
          <p>Commerce workspace</p>
        </div>
      </div>

      <div className="eb-sidebar__welcome">
        <span className="eb-badge">Verified Store</span>
        <h2>{userName}</h2>
        <p>Store admin dashboard</p>
      </div>

      <nav className="eb-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to === "/dashboard/overview" && location.pathname === "/dashboard");

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

      
    </aside>
  );
}
