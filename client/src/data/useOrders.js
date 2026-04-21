import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/orders`;

const inferCategory = (value = "") => {
  const name = String(value).toLowerCase();

  if (name.includes("coffee") || name.includes("tea") || name.includes("rice") || name.includes("food")) {
    return "Groceries";
  }

  if (name.includes("soap") || name.includes("cream") || name.includes("lipstick") || name.includes("beauty")) {
    return "Beauty";
  }

  if (name.includes("bag") || name.includes("watch") || name.includes("shoe") || name.includes("fashion")) {
    return "Fashion";
  }

  return "Essentials";
};

const parseAmount = (value) => {
  const amount = Number(String(value ?? 0).replace(/[^\d.-]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const normalizeOrder = (order, index) => {
  const productName =
    order.productName ||
    order.product ||
    order.itemName ||
    order.item ||
    order.name ||
    `Order ${index + 1}`;

  const quantity = Number(order.quantity || order.qty || 1) || 1;
  const price = parseAmount(order.price || order.amount || order.total || order.subtotal);
  const createdAt = order.createdAt || order.date || order.orderDate || new Date().toISOString();

  return {
    id: order._id || order.id || `order-${index}`,
    productName,
    quantity,
    price,
    total: parseAmount(order.total) || price * quantity,
    status: order.status || "Pending",
    customerName:
      order.customerName ||
      order.customer ||
      order.userName ||
      order.user ||
      order.buyer ||
      `Customer ${index + 1}`,
    category: order.category || inferCategory(productName),
    createdAt,
  };
};

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const rawOrders = Array.isArray(payload) ? payload : payload.orders;
        const normalized = Array.isArray(rawOrders)
          ? rawOrders.map((item, index) => normalizeOrder(item, index))
          : [];

        if (!ignore) {
          setOrders(normalized);
        }
      } catch (err) {
        if (!ignore) {
          setOrders([]);
          setError(err.message || "Unable to load orders.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      ignore = true;
    };
  }, []);

  return { orders, loading, error };
}
