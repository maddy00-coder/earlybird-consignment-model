import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/auth" || location.pathname === "/login";

  const getNavClassName = ({ isActive }) =>
    `nav-link${isActive ? " is-active" : ""}`;

  return (
    <div className="navbar">

      {/* LOGO (clickable now) */}
      <Link to="/" className="logo">
        Early<span>Bird</span>
      </Link>

      {/* MENU */}
      <div className="nav-links">
        <NavLink to="/" end className={getNavClassName}>
          Home
        </NavLink>
        <NavLink to="/about" className={getNavClassName}>
          About
        </NavLink>
        <NavLink to="/pricing" className={getNavClassName}>
          Pricing
        </NavLink>
        <NavLink to="/contact" className={getNavClassName}>
          Contact
        </NavLink>
        <NavLink
          to="/auth"
          className={() => `nav-link${isLoginRoute ? " is-active" : ""}`}
        >
          Login
        </NavLink>
      </div>

    </div>
  );
}
