const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Product = require('./models/Product');
const Transaction = require('./models/Transaction');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// connect db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop_inventory';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error:', err));

// auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: role || 'cashier' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// product routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, quantity, lowStockLimit } = req.body;
    const newProduct = new Product({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      lowStockLimit: Number(lowStockLimit) || 5
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add product' });
  }
});

app.post('/api/products/:id/adjust', async (req, res) => {
  try {
    const { count, type } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (type === 'SALE') {
      if (product.quantity < count) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      product.quantity -= Number(count);
    } else if (type === 'RESTOCK') {
      product.quantity += Number(count);
    }

    await product.save();

    const transaction = new Transaction({
      productId: product._id,
      productName: product.name,
      type,
      quantity: Number(count)
    });
    await transaction.save();

    res.json({ product, transaction });
  } catch (err) {
    res.status(500).json({ error: 'Stock update failed' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const history = await Transaction.find().sort({ date: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'History fetch failed' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
