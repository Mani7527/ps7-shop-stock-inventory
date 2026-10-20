# Shop Inventory & Stock Management System (PS7)

A simple, functional MERN stack web application built for retail inventory tracking and stock adjustments.

---

## 🌟 Key Features (Core 40%–50% Scope)

1. **Inventory Management**:
   - Add new products with name, category, price, quantity, and minimum stock threshold.
   - Real-time stock status badge: `In Stock`, `Low Stock` (when quantity $\le$ threshold), and `Out of Stock`.
2. **Two User Roles**:
   - **Admin**: Can add new products, restock items (+5 units), and delete products.
   - **Cashier**: Can record sales (-1 unit) to deduct stock directly.
3. **Core Business Rule**:
   - Server-side check that prevents selling if available stock is insufficient (`400 Bad Request`).
4. **Summary Dashboard**:
   - Live count of Total Products, Total Units in stock, and Low Stock alerts.
5. **Stock History**:
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

### 1. Server Setup

```bash
cd server
npm install
```

Create `.env` inside `server/` (optional, defaults to local MongoDB):
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/shop_inventory
```

(Optional) Seed sample data:
```bash
node seed.js
```

Start the backend server:
```bash
npm start
```
Server runs on: `http://localhost:5000`

---

### 2. Client Setup

```bash
cd ../client
npm install
npm run dev
```
Client runs on: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get list of all products |
| `POST` | `/api/products` | Add a new product |
| `POST` | `/api/products/:id/adjust` | Record a Sale or Restock |
| `DELETE` | `/api/products/:id` | Delete a product |
| `GET` | `/api/transactions` | Get recent stock transactions |
