const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// connect db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop_inventory';
mongoose.connect(MONGO_URI)
  .then(() => seedDB())
  .catch((err) => console.log('DB error:', err));

// seed data
const initialProducts = [
  { name: 'Wireless Mouse', category: 'Electronics', price: 499, quantity: 15, lowStockLimit: 5 },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 1999, quantity: 4, lowStockLimit: 5 },
  { name: 'Notebook A5', category: 'Stationery', price: 80, quantity: 25, lowStockLimit: 10 },
  { name: 'Gel Pen (Pack)', category: 'Stationery', price: 120, quantity: 2, lowStockLimit: 5 },
  { name: 'USB-C Cable', category: 'Accessories', price: 299, quantity: 0, lowStockLimit: 3 }
];

async function seedDB() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    console.log('Seed success');
  } catch (err) {
    console.log('Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
}
