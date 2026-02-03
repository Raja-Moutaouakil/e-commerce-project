const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  notes: { type: String },
  cartItems: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  total: { type: Number, required: true },
  shipping: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);