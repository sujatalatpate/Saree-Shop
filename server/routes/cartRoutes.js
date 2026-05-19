const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const cartController = require('../controllers/cartController');

// GET CART
router.get('/', auth, cartController.getCart);

// ADD TO CART
router.post('/', auth, cartController.addToCart);

router.delete('/clear', auth, cartController.clearCart);
// REMOVE ITEM
router.delete('/:productId', auth, cartController.removeFromCart);

// INCREASE QTY
router.put('/increase/:productId', auth, cartController.increaseQty);

// DECREASE QTY
router.put('/decrease/:productId', auth, cartController.decreaseQty);



module.exports = router;