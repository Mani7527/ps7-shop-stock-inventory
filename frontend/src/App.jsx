import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import History from './components/History';
import Login from './components/Login';
import { API_URL } from './config';

function App() {
  // auth state
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const [products, setProducts] = useState([]);

  const handleLoginSuccess = (userToken, userData) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // fetch products
  const loadProducts = () => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log('Error:', err));
  };

  useEffect(() => {
    if (token) {
      loadProducts();
    }
  }, [token]);

  // stock actions
  const handleAddProduct = (newProduct) => {
    fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then(() => loadProducts())
      .catch((err) => console.log('Error:', err));
  };

  const handleAdjustStock = (id, count, type) => {
    fetch(`${API_URL}/products/${id}/adjust`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count, type })
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => alert(err.error));
        }
        return res.json().then(() => loadProducts());
      })
      .catch((err) => console.log('Error:', err));
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Delete this product?')) return;
    fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
      .then(() => loadProducts())
      .catch((err) => console.log('Error:', err));
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Dashboard
                  products={products}
                  onAddProduct={handleAddProduct}
                  role={user ? user.role : 'cashier'}
                />
                <ProductList
                  products={products}
                  onAdjustStock={handleAdjustStock}
                  onDeleteProduct={handleDeleteProduct}
                  role={user ? user.role : 'cashier'}
                />
              </>
            }
          />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
