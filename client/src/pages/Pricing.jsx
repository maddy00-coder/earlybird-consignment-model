import { Link } from "react-router-dom";

const comparisonData = [
  {
    product: "Chai Masala",
    market: "₹200",
    wholesale: "₹140",
    earlybird: "₹125",
    savings: "₹75 saved",
  },
  {
    product: "Perfume",
    market: "₹1200",
    wholesale: "₹900",
    earlybird: "₹799",
    savings: "₹401 saved",
  },
  {
    product: "Shampoo",
    market: "₹350",
    wholesale: "₹250",
    earlybird: "₹199",
    savings: "₹151 saved",
  },
  {
    product: "Dry Fruits",
    market: "₹700",
    wholesale: "₹550",
    earlybird: "₹499",
    savings: "₹201 saved",
  },
];

const benefits = [
  {
    title: "Introductory first-order pricing",
    description:
      "New retailers can start with lower upfront risk through special opening order rates and flexible entry economics.",
  },
  {
    title: "Better margins for small stores",
    description:
      "EarlyBird pricing helps businesses keep more room between buying cost and selling price, especially on fast-moving products.",
  },
  {
    title: "Confidence before scale",
    description:
      "Merchants can validate demand, test categories, and expand thoughtfully instead of locking capital too early.",
  },
];

export default function Pricing() {
  return (
    <div
      className="section"
      style={{
        paddingTop: "72px",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "12px" }}>Pricing Comparison</h2>
          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            EarlyBird helps small retailers begin with introductory first-order pricing
            and a lower-risk buying model, so they can test products, protect cash
            flow, and grow with better margins.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "22px",
            marginTop: "36px",
          }}
        >
          <div
            className="card"
            style={{
              textAlign: "left",
              padding: "24px",
              minHeight: "160px",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Special first-order access</h3>
            <p style={{ margin: 0 }}>Start with pricing designed to make your first inventory move more comfortable and practical.</p>
          </div>

          <div
            className="card"
            style={{
              textAlign: "left",
              padding: "24px",
              minHeight: "160px",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Lower downside, faster validation</h3>
            <p style={{ margin: 0 }}>Try winning products early, evaluate demand quickly, and scale with more confidence.</p>
          </div>

          <div
            className="card"
            style={{
              textAlign: "left",
              padding: "24px",
              minHeight: "160px",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Built for retailer margins</h3>
            <p style={{ margin: 0 }}>Our model is designed to give growing stores more room to earn on every sale.</p>
          </div>
        </div>

        <div
          style={{
            marginTop: "42px",
            background: "var(--surface-strong)",
            borderRadius: "24px",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 20px 45px rgba(124, 46, 40, 0.12)",
            padding: "32px 28px",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto 24px",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Compare your buying advantage</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>
              See how EarlyBird pricing helps reduce entry cost compared with typical
              market and wholesale pricing.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                fontSize: "0.96rem",
                color: "var(--text)",
                overflow: "hidden",
                borderRadius: "18px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      background: "var(--surface-accent)",
                      borderBottom: "1px solid var(--border-strong)",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      background: "var(--surface-accent)",
                      borderBottom: "1px solid var(--border-strong)",
                    }}
                  >
                    Market Price
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      background: "var(--surface-accent)",
                      borderBottom: "1px solid var(--border-strong)",
                    }}
                  >
                    Wholesale
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      background: "var(--surface-accent-strong)",
                      borderBottom: "1px solid var(--border-strong)",
                      color: "var(--gold)",
                    }}
                  >
                    EarlyBird
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      background: "var(--surface-accent)",
                      borderBottom: "1px solid var(--border-strong)",
                    }}
                  >
                    Savings
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonData.map((item, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "16px 18px",
                        textAlign: "left",
                        background: "var(--surface)",
                        borderBottom: "1px solid rgba(124, 46, 40, 0.1)",
                      }}
                    >
                      {item.product}
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        textAlign: "left",
                        background: "var(--surface)",
                        borderBottom: "1px solid rgba(124, 46, 40, 0.1)",
                      }}
                    >
                      {item.market}
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        textAlign: "left",
                        background: "var(--surface)",
                        borderBottom: "1px solid rgba(124, 46, 40, 0.1)",
                      }}
                    >
                      {item.wholesale}
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        textAlign: "left",
                        background: "var(--surface-accent-strong)",
                        borderBottom: "1px solid rgba(124, 46, 40, 0.1)",
                        color: "var(--gold)",
                        fontWeight: 700,
                      }}
                    >
                      {item.earlybird}
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        textAlign: "left",
                        background: "var(--surface)",
                        borderBottom: "1px solid rgba(124, 46, 40, 0.1)",
                        fontWeight: 600,
                      }}
                    >
                      {item.savings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: "42px" }}>
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "12px" }}>Why choose EarlyBird</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>
              Our pricing model is built to help small businesses start with lower
              friction, better visibility on product economics, and more confidence
              before scaling up repeat orders.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "22px",
              marginTop: "28px",
            }}
          >
            {benefits.map((item) => (
              <div
                key={item.title}
                className="card"
                style={{
                  textAlign: "left",
                  padding: "24px",
                  minHeight: "180px",
                }}
              >
                <h4 style={{ marginTop: 0, marginBottom: "12px", color: "var(--gold)" }}>{item.title}</h4>
                <p style={{ margin: 0, lineHeight: 1.75 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "42px",
            textAlign: "center",
            background: "var(--surface-soft)",
            border: "1px solid var(--border-strong)",
            borderRadius: "24px",
            padding: "30px 24px",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Start with smarter inventory economics</h3>
          <p
            style={{
              margin: "0 auto 18px",
              maxWidth: "640px",
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            Join EarlyBird to access introductory pricing, reduce first-order risk,
            and build stronger margins from the start.
          </p>
          <Link to="/signup">
            <button style={{ minWidth: "190px" }}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
