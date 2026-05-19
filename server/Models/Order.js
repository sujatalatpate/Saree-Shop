const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      qty: Number
    }
  ],

 shippingAddress: {
  fullName: String,

  email: String,

  phone: String,

  country: String,

  streetAddress: String,

  apartment: String,

  city: String,

  state: String,

  pincode: String
},

  paymentMethod: {
    type: String,
    default: 'COD'
  },

  totalAmount: Number,

  orderStatus: {
  type: String,
  default: 'Processing'
}

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);