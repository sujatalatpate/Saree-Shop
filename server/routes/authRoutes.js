const express = require('express');
const router = express.Router();
const { register, login, getWishlist, toggleWishlist } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get(
  '/wishlist/:userId',
  getWishlist
);

router.post(
  '/wishlist',
  toggleWishlist
);

module.exports = router;