import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./dashboard.css";

import { CartProvider } from "./context/CartContext";

const savedTheme = window.localStorage.getItem("earlybird-theme");
const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

const isDashboardPath = window.location.pathname.startsWith("/dashboard");
document.body.classList.toggle("dark", isDashboardPath && initialTheme === "dark");
document.documentElement.style.colorScheme =
  isDashboardPath && initialTheme === "dark" ? "dark" : "light";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
