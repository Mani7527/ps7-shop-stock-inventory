import React from 'react';

function ProductList({ products, onAdjustStock, onDeleteProduct, role }) {
  // status check
  const getStatusBadge = (product) => {
    if (product.quantity === 0) {
      return <span className="badge badge-out">Out of Stock</span>;
    }
    if (product.quantity <= product.lowStockLimit) {
      return <span className="badge badge-low">Low Stock</span>;
    }
    return <span className="badge badge-in">In Stock</span>;
  };

  return (
    <div className="card">
      <h3>Inventory Items</h3>

      {/* product table */}
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No products found
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.name}</strong></td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>{getStatusBadge(item)}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn-sell"
                      onClick={() => onAdjustStock(item._id, 1, 'SALE')}
                      disabled={item.quantity === 0}
                    >
                      - Sell 1
                    </button>

                    {role === 'admin' && (
                      <>
                        <button
                          className="btn-restock"
                          onClick={() => onAdjustStock(item._id, 5, 'RESTOCK')}
                        >
                          + Restock 5
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => onDeleteProduct(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
