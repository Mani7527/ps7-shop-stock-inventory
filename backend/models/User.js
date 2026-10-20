const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'cashier'], default: 'cashier' }
}, { timestamps: true });

// export model
module.exports = mongoose.model('User', userSchema);
