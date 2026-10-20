import React, { useState } from 'react';
import { API_URL } from '../config';

// auth form
function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  const [error, setError] = useState('');

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const payload = isRegister ? { username, password, role } : { username, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        return;
      }

      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h3>{isRegister ? 'Register Account' : 'Login'}</h3>

      {error && <p style={{ color: '#d9534f', marginTop: '10px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegister && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit" className="btn-primary">
          {isRegister ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <p style={{ marginTop: '15px', fontSize: '13px', textAlign: 'center' }}>
        {isRegister ? 'Already have an account? ' : "Don't have an account? "}
        <span
          style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  );
}

export default Login;
