import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function History() {
  const [transactions, setTransactions] = useState([]);

  // fetch transactions
  useEffect(() => {
    fetch(`${API_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log('Fetch error:', err));
  }, []);

  return (
    <div className="card">
      <h3>Stock History</h3>

      {/* transactions table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                No recent activity
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>{tx.productName}</td>
                <td>
                  <span className={`badge ${tx.type === 'SALE' ? 'badge-low' : 'badge-in'}`}>
                    {tx.type}
                  </span>
                </td>
                <td>{tx.quantity} units</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default History;
