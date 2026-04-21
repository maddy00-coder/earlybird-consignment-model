import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { CircleDollarSign, PackageCheck, PiggyBank, ShoppingBasket, Users } from "lucide-react";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { useOrders } from "../data/useOrders";

ChartJS.register(
  ArcElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
);

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function MetricCard({ icon: Icon, label, value, note, tone }) {
  return (
    <article className="eb-card">
      <div className="eb-metric-card__header">
        <div>
          <p>{label}</p>
          <div className="eb-metric-card__value">{value}</div>
          <span className={`eb-pill ${tone}`}>{note}</span>
        </div>
        <div className="eb-metric-card__icon">
          <Icon size={22} />
        </div>
      </div>
    </article>
  );
}

function OverviewSkeleton() {
  return (
    <>
      <div className="eb-grid eb-grid--metrics">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="eb-skeleton eb-skeleton--card" />
        ))}
      </div>
      <div className="eb-grid eb-grid--two" style={{ marginTop: 20 }}>
        <div className="eb-skeleton eb-skeleton--chart" />
        <div className="eb-skeleton eb-skeleton--chart" />
      </div>
    </>
  );
}

export default function Overview() {
  const { cart } = useContext(CartContext);
  const { orders, loading, error } = useOrders();

  const totalSales = orders.reduce((sum, order) => sum + order.quantity, 0);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const profit = Math.round(revenue * 0.24);
  const activeProducts = 18;
  const recentOrders = [...orders].slice(-5).reverse();

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: orders.length ? [22000, 28000, 26000, 34000, 31000, 42000] : [12000, 18000, 16000, 24000, 21000, 30000],
        fill: true,
        borderColor: "#ea580c",
        backgroundColor: "rgba(234, 88, 12, 0.14)",
        tension: 0.35,
        pointBackgroundColor: "#d97706",
        pointBorderWidth: 0,
      },
    ],
  };

  const categoryData = {
    labels: ["Groceries", "Beauty", "Fashion", "Essentials"],
    datasets: [
      {
        data: [6, 4, 5, 3],
        backgroundColor: ["#f59e0b", "#fb923c", "#facc15", "#c2410c"],
        borderWidth: 0,
      },
    ],
  };

  if (loading) return <OverviewSkeleton />;

  return (
    <>
      <div className="eb-grid eb-grid--metrics">
        <MetricCard icon={CircleDollarSign} label="Total Sales" value={totalSales} note="Units sold across all orders" tone="eb-pill--neutral" />
        <MetricCard icon={PackageCheck} label="Orders Count" value={orders.length} note="Live from current orders source" tone="eb-pill--neutral" />
        <MetricCard icon={PiggyBank} label="Revenue" value={formatCurrency(revenue)} note="Calculated from current order totals" tone="eb-pill--success" />
        <MetricCard icon={ShoppingBasket} label="Active Products" value={activeProducts} note="Products currently visible in catalog" tone="eb-pill--warning" />
      </div>

      <div className="eb-grid eb-grid--two" style={{ marginTop: 20 }}>
        <article className="eb-card">
          <div className="eb-graph-card__header">
            <div>
              <h3>Sales trend</h3>
              <p>Visualize revenue momentum across recent months.</p>
            </div>
          </div>
          <div className="eb-chart-wrap">
            <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </article>

        <article className="eb-card">
          <div className="eb-graph-card__header">
            <div>
              <h3>Recent orders</h3>
              <p>Keep a quick eye on your latest customer activity.</p>
            </div>
          </div>

          {recentOrders.length ? (
            <div className="eb-highlight-list" style={{ marginTop: 18 }}>
              {recentOrders.map((order) => (
                <div key={order.id} className="eb-highlight-item">
                  <div className="eb-item-media">{order.productName.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <strong>{order.productName}</strong>
                    <p>{order.customerName}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>{formatCurrency(order.total)}</strong>
                    <div className={`eb-pill ${order.status.toLowerCase().includes("deliver") ? "eb-pill--success" : "eb-pill--warning"}`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="eb-empty-state">
              <div className="eb-empty-state__icon">
                <Users size={28} />
              </div>
              <h3>No recent orders</h3>
              <p>{error || "Recent customer activity will appear here automatically once orders are available."}</p>
            </div>
          )}
        </article>
      </div>

      <article className="eb-card" style={{ marginTop: 20 }}>
        <div className="eb-graph-card__header">
          <div>
            <h3>Category distribution</h3>
            <p>See which product categories are contributing the most order volume.</p>
          </div>
        </div>
        <div className="eb-chart-wrap eb-chart-wrap--compact">
          <Doughnut data={categoryData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, cutout: "70%" }} />
        </div>
      </article>
    </>
  );
}
