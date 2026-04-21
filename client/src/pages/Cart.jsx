import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";

import DashboardShell from "../components/DashboardShell";
import { CartContext } from "../context/CartContext";

const COUPONS = [
  { code: "EARLY10", type: "percent", value: 10, note: "10% off on any order" },
  { code: "WELCOME20", type: "percent", value: 20, note: "20% off for new stores" },
  { code: "BIRD150", type: "flat", value: 150, note: "Flat ₹150 off on orders above ₹1,000" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getDiscountAmount = (coupon, subtotal) => {
  if (!coupon) return 0;
  if (coupon.type === "percent") return Math.round((subtotal * coupon.value) / 100);
  return subtotal >= 1000 ? coupon.value : 0;
};

export default function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = getDiscountAmount(appliedCoupon, subtotal);
  const gst = Math.round((subtotal - discount) * 0.18);
  const shipping = subtotal - discount >= 1500 ? 0 : cart.length ? 99 : 0;
  const total = subtotal - discount + gst + shipping;
  const remainingForFreeShipping = Math.max(1500 - (subtotal - discount), 0);
  const progress = Math.min(((subtotal - discount) / 1500) * 100, 100);

  const applyCoupon = (code) => {
    const coupon = COUPONS.find((item) => item.code === code.trim().toUpperCase());

    setCouponError("");
    setCouponMessage("");

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponError("That coupon code is not valid.");
      return;
    }

    if (coupon.type === "flat" && subtotal < 1000) {
      setAppliedCoupon(null);
      setCouponError("This coupon unlocks only after your subtotal crosses ₹1,000.");
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput("");
    setCouponMessage(`${coupon.code} applied. ${coupon.note}`);
  };

  return (
    <DashboardShell
      title="Cart"
      subtitle="Adjust quantities, remove products, apply coupons, and review the final order summary in one place."
      cartCount={cart.length}
    >
      {cart.length ? (
        <div className="eb-cart-layout">
          <div className="eb-grid">
            {cart.map((item) => (
              <article key={item.name} className="eb-card">
                <div className="eb-cart-item">
                  <div className="eb-item-media">{item.name.slice(0, 2).toUpperCase()}</div>

                  <div className="eb-cart-item__details">
                    <h3>{item.name}</h3>
                    <p>{formatCurrency(item.price)} per unit</p>
                  </div>

                  <div className="eb-quantity">
                    <button type="button" onClick={() => decreaseQty(item.name)} aria-label={`Decrease ${item.name}`}>
                      <Minus size={14} />
                    </button>
                    <strong>{item.qty}</strong>
                    <button type="button" onClick={() => increaseQty(item.name)} aria-label={`Increase ${item.name}`}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <div>
                    <strong>{formatCurrency(item.price * item.qty)}</strong>
                  </div>

                  <button className="eb-ghost-button" type="button" onClick={() => removeItem(item.name)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}

            <article className="eb-card">
              <div className="eb-graph-card__header">
                <div>
                  <h3>Offers and coupons</h3>
                  <p>Apply a valid coupon to update your total instantly.</p>
                </div>
                <span className="eb-pill eb-pill--neutral">
                  <Tag size={14} />
                  Coupon
                </span>
              </div>

              <div className="eb-form-row" style={{ marginTop: 18 }}>
                <input
                  className="eb-input"
                  value={couponInput}
                  onChange={(event) => setCouponInput(event.target.value)}
                  placeholder="Enter coupon code"
                />
                <button className="eb-primary-button" type="button" onClick={() => applyCoupon(couponInput)}>
                  Apply coupon
                </button>
              </div>

              {couponMessage ? <p style={{ color: "var(--eb-success)", marginTop: 12 }}>{couponMessage}</p> : null}
              {couponError ? <p style={{ color: "var(--eb-danger)", marginTop: 12 }}>{couponError}</p> : null}

              <div className="eb-coupon-box">
                {COUPONS.map((coupon) => (
                  <button
                    key={coupon.code}
                    className="eb-chip-button"
                    type="button"
                    style={{ marginRight: 10, marginBottom: 10, borderRadius: 999, padding: "10px 14px" }}
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    {coupon.code}
                  </button>
                ))}
              </div>
            </article>
          </div>

          <aside className="eb-card">
            <div className="eb-graph-card__header">
              <div>
                <h3>Order summary</h3>
                <p>Review the pricing breakdown before checkout.</p>
              </div>
            </div>

            <div className="eb-progress">
              <div className="eb-order-summary__row">
                <strong>Free shipping progress</strong>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="eb-progress__track">
                <div className="eb-progress__bar" style={{ width: `${progress}%` }} />
              </div>
              <p style={{ marginTop: 10 }}>
                {remainingForFreeShipping
                  ? `Add ${formatCurrency(remainingForFreeShipping)} more to unlock free shipping.`
                  : "You unlocked free shipping for this order."}
              </p>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="eb-order-summary__row">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div className="eb-order-summary__row" style={{ marginTop: 12 }}>
                <span>Discount</span>
                <strong style={{ color: "var(--eb-success)" }}>
                  {discount ? `- ${formatCurrency(discount)}` : formatCurrency(0)}
                </strong>
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

            <button className="eb-primary-button" type="button" style={{ width: "100%", marginTop: 20 }} onClick={() => navigate("/dashboard/checkout")}>
              Proceed to checkout
            </button>
          </aside>
        </div>
      ) : (
        <article className="eb-card">
          <div className="eb-empty-state">
            <div className="eb-empty-state__icon">
              <ShoppingBag size={28} />
            </div>
            <h3>Your cart is empty</h3>
            <p>Add items from Products and they will appear here with quantity controls and pricing.</p>
          </div>
        </article>
      )}
    </DashboardShell>
  );
}
