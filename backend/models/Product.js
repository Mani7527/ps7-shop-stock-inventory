const mongoose = require('mongoose');

// product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  lowStockLimit: { type: Number, default: 5 }
}, { timestamps: true });

// export model
module.exports = mongoose.model('Product', productSchema);
