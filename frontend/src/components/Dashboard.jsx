import React, { useState } from 'react';

function Dashboard({ products, onAddProduct, role }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lowStockLimit, setLowStockLimit] = useState(5);

  // calculate stats
  const totalProducts = products.length;
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity <= p.lowStockLimit).length;

  // add product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price) return;

    onAddProduct({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity) || 0,
      lowStockLimit: Number(lowStockLimit) || 5
    });

    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setLowStockLimit(5);
  };

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Units</h3>
          <p>{totalUnits}</p>
        </div>
        <div className={`stat-card ${lowStockCount > 0 ? 'alert' : ''}`}>
          <h3>Low Stock Items</h3>
          <p>{lowStockCount}</p>
        </div>
      </div>

      {role === 'admin' && (
        <div className="card">
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Low Limit"
              value={lowStockLimit}
              onChange={(e) => setLowStockLimit(e.target.value)}
            />
            <button type="submit" className="btn-primary">Add Item</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
