export default function Orders() {
  const orders = [
    { id: 1, name: "Rahul", amount: "₹500", status: "Delivered" },
    { id: 2, name: "Sneha", amount: "₹1200", status: "Pending" },
  ];

  return (
    <div>
      <h2>Orders</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Amount</th><th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.amount}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}