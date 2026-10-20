import React from 'react';
import { NavLink } from 'react-router-dom';

// nav component
function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h2>ShopStock</h2>

      <div className="nav-links">
        <NavLink to="/">Inventory</NavLink>
        <NavLink to="/history">History</NavLink>

        {/* user info */}
        {user ? (
          <div className="role-box">
            <span><strong>{user.username}</strong> ({user.role})</span>
            <button
              onClick={onLogout}
              style={{ padding: '4px 8px', fontSize: '12px', background: '#dc3545', color: '#fff' }}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
