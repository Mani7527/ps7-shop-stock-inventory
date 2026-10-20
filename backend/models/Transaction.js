const mongoose = require('mongoose');

// transaction schema
const transactionSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  productName: { type: String, required: true },
  type: { type: String, enum: ['SALE', 'RESTOCK'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// export model
module.exports = mongoose.model('Transaction', transactionSchema);
