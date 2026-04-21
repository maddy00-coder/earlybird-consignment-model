import { PackageOpen } from "lucide-react";
import { useOrders } from "../data/useOrders";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getBadgeClass = (status) => {
  const value = status.toLowerCase();

  if (value.includes("deliver")) return "eb-pill eb-pill--success";
  if (value.includes("ship")) return "eb-pill eb-pill--warning";
  if (value.includes("cancel")) return "eb-pill eb-pill--danger";
  return "eb-pill eb-pill--neutral";
};

export default function Orders() {
  const { orders, loading, error } = useOrders();

  return (
    <article className="eb-card">
      <div className="eb-graph-card__header">
        <div>
          <h3>Order list</h3>
          <p>Connected to `GET /api/orders` when your backend is running.</p>
        </div>
        <span className="eb-pill eb-pill--neutral">{orders.length} orders</span>
      </div>

      {loading ? (
        <div className="eb-skeleton eb-skeleton--chart" />
      ) : orders.length ? (
        <div className="eb-table-wrap">
          <table className="eb-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="eb-table__cell-product">
                      <div className="eb-table__thumb">{order.productName.slice(0, 2).toUpperCase()}</div>
                      <div>
                        <strong>{order.productName}</strong>
                        <div>{order.category}</div>
                      </div>
                    </div>
                  </td>
                  <td>{order.customerName}</td>
                  <td>{formatCurrency(order.total || order.price)}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span className={getBadgeClass(order.status)}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="eb-empty-state">
          <div className="eb-empty-state__icon">
            <PackageOpen size={28} />
          </div>
          <h3>No orders to show</h3>
          <p>{error || "Your orders table will populate as soon as the backend returns data."}</p>
        </div>
      )}
    </article>
  );
}
