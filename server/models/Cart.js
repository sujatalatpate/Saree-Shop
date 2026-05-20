const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);