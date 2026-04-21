import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardRedirect from "./pages/DashboardRedirect";
import ProductsCatalog from "./pages/ProductsCatalog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

import Overview from "./pages/Overview";
import Orders from "./pages/Orders";
import CartDashboard from "./pages/CartDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SupportCenter from "./pages/SupportCenter";
import BusinessProfile from "./pages/BusinessProfile";
import DashboardLayout from "./pages/DashboardLayout";

const getPreferredTheme = () => {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem("earlybird-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function Layout() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const hideNavbar = isDashboardRoute;
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    const shouldUseDark = isDashboardRoute && theme === "dark";
    document.body.classList.toggle("dark", shouldUseDark);
    document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
    window.localStorage.setItem("earlybird-theme", theme);
  }, [isDashboardRoute, theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {!hideNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      <Chatbot />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsCatalog />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route index element={<DashboardRedirect />} />
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<ProductsCatalog />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<CartDashboard />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="support" element={<SupportCenter />} />
          <Route path="profile" element={<BusinessProfile />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
