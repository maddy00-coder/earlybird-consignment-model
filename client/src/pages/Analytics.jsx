import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useContext, useState } from "react";
import { BarChart3 } from "lucide-react";

import DashboardShell from "../components/DashboardShell";
import { CartContext } from "../context/CartContext";
import { useOrders } from "../data/useOrders";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
);

const FILTERS = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const getLabel = (dateValue, filter) => {
  const date = new Date(dateValue);

  if (filter === "weekly") {
    return `W${Math.ceil(date.getDate() / 7)}`;
  }

  return date.toLocaleDateString("en-IN", { month: "short" });
};

export default function Analytics() {
  const { cart } = useContext(CartContext);
  const { orders, loading, error } = useOrders();
  const [filter, setFilter] = useState("monthly");

  const grouped = orders.reduce((accumulator, order) => {
    const label = getLabel(order.createdAt, filter);
    const current = accumulator[label] || { revenue: 0, orders: 0 };
    accumulator[label] = {
      revenue: current.revenue + order.total,
      orders: current.orders + 1,
    };
    return accumulator;
  }, {});

  const labels = Object.keys(grouped);
  const revenueData = labels.map((label) => grouped[label].revenue);
  const orderCountData = labels.map((label) => grouped[label].orders);

  const categories = orders.reduce((accumulator, order) => {
    accumulator[order.category] = (accumulator[order.category] || 0) + order.total;
    return accumulator;
  }, {});

  return (
    <DashboardShell
      title="Analytics"
      subtitle="Compare sales momentum, order counts, and category performance with quick weekly and monthly filters."
      cartCount={cart.length}
    >
      <div className="eb-graph-card__header" style={{ marginBottom: 20 }}>
        <div>
          <h3>Performance trends</h3>
          <p>Animated charts update automatically when you switch the time window.</p>
        </div>
        <div className="eb-filter-group">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={filter === item.value ? "is-active" : ""}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="eb-grid eb-grid--three">
          <div className="eb-skeleton eb-skeleton--chart" />
          <div className="eb-skeleton eb-skeleton--chart" />
          <div className="eb-skeleton eb-skeleton--chart" />
        </div>
      ) : orders.length ? (
        <div className="eb-grid eb-grid--three">
          <article className="eb-card">
            <h3>Sales chart</h3>
            <p>Revenue trend for the selected range.</p>
            <div className="eb-chart-wrap eb-chart-wrap--compact">
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: revenueData,
                      borderColor: "#ea580c",
                      backgroundColor: "rgba(249, 115, 22, 0.12)",
                      fill: true,
                      tension: 0.35,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </article>

          <article className="eb-card">
            <h3>Orders chart</h3>
            <p>Order volume by selected period.</p>
            <div className="eb-chart-wrap eb-chart-wrap--compact">
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Orders",
                      data: orderCountData,
                      backgroundColor: "#f59e0b",
                      borderRadius: 10,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </article>

          <article className="eb-card">
            <h3>Category distribution</h3>
            <p>Revenue contribution by product category.</p>
            <div className="eb-chart-wrap eb-chart-wrap--compact">
              <Doughnut
                data={{
                  labels: Object.keys(categories),
                  datasets: [
                    {
                      data: Object.values(categories),
                      backgroundColor: ["#ea580c", "#f59e0b", "#facc15", "#9a3412"],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false, cutout: "64%" }}
              />
            </div>
          </article>
        </div>
      ) : (
        <article className="eb-card">
          <div className="eb-empty-state">
            <div className="eb-empty-state__icon">
              <BarChart3 size={28} />
            </div>
            <h3>No analytics data yet</h3>
            <p>{error || "Once your backend returns orders, the analytics dashboard will become fully live."}</p>
          </div>
        </article>
      )}
    </DashboardShell>
  );
}
