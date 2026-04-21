import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <article className="eb-card">
      <div className="eb-empty-state">
        <div className="eb-empty-state__icon">
          <CheckCircle2 size={28} />
        </div>
        <h3>Order placed successfully</h3>
        <p>
          {state?.orderCount || 0} items were submitted for processing.
          {state?.orderGroup ? ` Reference: ${state.orderGroup}` : ""}
        </p>
        <strong>{formatCurrency(state?.total)}</strong>

        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <button className="eb-secondary-button" type="button" onClick={() => navigate("/dashboard/orders")}>
            View orders
          </button>
          <button className="eb-primary-button" type="button" onClick={() => navigate("/dashboard/products")}>
            Continue shopping
          </button>
        </div>
      </div>
    </article>
  );
}
