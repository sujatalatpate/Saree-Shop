const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  name: String,

  rating: Number,

  comment: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const productSchema = new mongoose.Schema({

  name: String,

  price: Number,

  originalPrice: Number,

  discountPercent: Number,
  images: [
  {
    type: String
  }
],

  category: String,

  description: String,

  stock: Number,

  isTrending: {
    type: Boolean,
    default: false
  },

  isNewArrival: {
    type: Boolean,
    default: false
  },

  isFestive: {
    type: Boolean,
    default: false
  },

  // ⭐ REVIEWS
  reviews: [reviewSchema],

  // ⭐ AVERAGE RATING
  rating: {
    type: Number,
    default: 0
  },

  // ⭐ TOTAL REVIEWS
  numReviews: {
    type: Number,
    default: 0
  }

});

module.exports =
  mongoose.models.Product ||
  mongoose.model('Product', productSchema);
