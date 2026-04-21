import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";
import { api } from "../utils/api";
import { getStoredUser } from "../utils/auth";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const storedUser = useMemo(() => getStoredUser(), []);
  const [form, setForm] = useState({
    customerName: storedUser?.name || "",
    customerEmail: storedUser?.email || "",
    customerPhone: storedUser?.phone || "",
    shippingAddress: storedUser?.address || "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 1500 ? 0 : cart.length ? 99 : 0;
  const total = subtotal + gst + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !form.customerName.trim() ||
      !form.customerEmail.trim() ||
      !form.shippingAddress.trim()
    ) {
      toast.error("Please complete the checkout details.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/orders/checkout", {
        userId: storedUser?.id || null,
        ...form,
        items: cart,
      });

      clearCart();
      toast.success(response.message || "Order placed successfully.");
      navigate("/dashboard/order-confirmation", {
        state: {
          orderGroup: response.orderGroup,
          total,
          orderCount: response.orders?.length || cart.length,
        },
      });
    } catch (error) {
      toast.error(error.message || "Unable to complete checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.length) {
    return (
      <article className="eb-card">
        <div className="eb-empty-state">
          <h3>No items available for checkout</h3>
          <p>Add items to your cart before continuing.</p>
        </div>
      </article>
    );
  }

  return (
    <div className="eb-cart-layout">
      <article className="eb-card">
        <div className="eb-graph-card__header">
          <div>
            <h3>Checkout</h3>
            <p>Review delivery details and confirm your order.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
          <div className="eb-ticket-grid">
            <div className="eb-field">
              <label htmlFor="checkout-name">Customer name</label>
              <input
                id="checkout-name"
                className="eb-input"
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div className="eb-field">
              <label htmlFor="checkout-email">Email</label>
              <input
                id="checkout-email"
                className="eb-input"
                type="email"
                value={form.customerEmail}
                onChange={(event) => setForm({ ...form, customerEmail: event.target.value })}
                placeholder="Enter email address"
              />
            </div>

            <div className="eb-field">
              <label htmlFor="checkout-phone">Phone</label>
              <input
                id="checkout-phone"
                className="eb-input"
                value={form.customerPhone}
                onChange={(event) => setForm({ ...form, customerPhone: event.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div className="eb-field eb-field--full">
              <label htmlFor="checkout-address">Shipping address</label>
              <textarea
                id="checkout-address"
                className="eb-textarea"
                value={form.shippingAddress}
                onChange={(event) => setForm({ ...form, shippingAddress: event.target.value })}
                placeholder="Enter full delivery address"
              />
            </div>

            <div className="eb-field eb-field--full">
              <label htmlFor="checkout-notes">Order notes</label>
              <textarea
                id="checkout-notes"
                className="eb-textarea"
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
                placeholder="Optional delivery or order notes"
              />
            </div>
          </div>

          <button className="eb-primary-button" type="submit" style={{ marginTop: 18 }} disabled={submitting}>
            {submitting ? "Placing order..." : "Confirm order"}
          </button>
        </form>
      </article>

      <aside className="eb-card">
        <div className="eb-graph-card__header">
          <div>
            <h3>Checkout summary</h3>
            <p>Everything included in this order.</p>
          </div>
        </div>

        <div className="eb-highlight-list" style={{ marginTop: 18 }}>
          {cart.map((item) => (
            <div key={item.name} className="eb-highlight-item">
              <div className="eb-item-media">{item.name.slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                <p>Qty {item.qty}</p>
              </div>
              <strong>{formatCurrency(item.price * item.qty)}</strong>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="eb-order-summary__row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="eb-order-summary__row" style={{ marginTop: 12 }}>
            <span>GST (18%)</span>
            <strong>{formatCurrency(gst)}</strong>
          </div>
          <div className="eb-order-summary__row" style={{ marginTop: 12 }}>
            <span>Shipping</span>
            <strong>{shipping ? formatCurrency(shipping) : "Free"}</strong>
          </div>
          <div className="eb-order-summary__row" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--eb-border)" }}>
            <strong>Total</strong>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>
      </aside>
    </div>
  );
}
