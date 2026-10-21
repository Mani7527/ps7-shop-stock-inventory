# Shop Inventory & Stock Management System (PS7)

A simple, functional MERN stack web application built for retail inventory tracking and stock adjustments.

---

## 🔗 Live Links

- **Frontend (Vercel)**: [https://ps7-shop-stock-inventory.vercel.app/](https://ps7-shop-stock-inventory.vercel.app/)
- **Backend (Render)**: [https://ps7-shop-stock-inventory.onrender.com](https://ps7-shop-stock-inventory.onrender.com)
- **GitHub Repository**: [https://github.com/Mani7527/ps7-shop-stock-inventory](https://github.com/Mani7527/ps7-shop-stock-inventory)

---

## 🌟 Key Features

1. **Authentication & Roles**:
   - Secure JWT-based Login and Registration.
   - Role-based capabilities for **Admin** (catalog management, restock, deletion) and **Cashier** (sales & stock deductions).
2. **Inventory Management**:
   - Add and track products with name, category, price, quantity, and minimum stock threshold.
   - Dynamic stock status badge: `In Stock`, `Low Stock` (when quantity $\le$ threshold), and `Out of Stock`.
3. **Core Business Rule**:
   - Server-side validation that prevents selling if available stock is insufficient (`400 Bad Request`).
4. **Summary Dashboard**:
   - Live count of Total Products, Total Units in stock, and Low Stock alerts.
5. **Stock Transaction History**:
   - Linked transaction log tracking date, product name, action type (`SALE` / `RESTOCK`), and quantity.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router DOM, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)

---

## 📁 Project Structure

```
Assignment-6/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── History.jsx
│   │   │   └── Login.jsx
│   │   ├── config.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside `backend/`:
```env
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/shop_inventory
JWT_SECRET=shopsecretkey123
```

(Optional) Seed sample data:
```bash
node seed.js
```

Start the backend server:
```bash
npm start
```
Backend runs on: `http://localhost:5001`

---

### 2. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user (Admin / Cashier) |
| `POST` | `/api/auth/login` | Authenticate and get JWT token |
| `GET` | `/api/products` | Get list of all products |
| `POST` | `/api/products` | Add a new product |
| `POST` | `/api/products/:id/adjust` | Record a Sale or Restock |
| `DELETE` | `/api/products/:id` | Delete a product |
| `GET` | `/api/transactions` | Get recent stock transactions |
