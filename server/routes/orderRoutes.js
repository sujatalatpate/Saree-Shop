const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");

const {
  createOrder,
  getOrders,
  getAllOrders, 
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');

// const auth = require('../middleware/authMiddleware.js'); 
// console.log(auth);

// // Protected Routes
// router.post('/', auth, createOrder);
// router.get('/', auth, getOrders);
// router.get('/all', getAllOrders);
router.get(
  '/all',
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// CUSTOMER
router.post('/', authMiddleware, createOrder);

router.get('/my-orders', authMiddleware, getMyOrders);


// ADMIN
router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

router.put(
  '/:id/status',
  authMiddleware,
  //adminMiddleware,
  updateOrderStatus
);

router.get(
  '/:id',
  authMiddleware,
  getOrderById
);

router.put(
  '/cancel/:id',
  authMiddleware,
  cancelOrder
);

module.exports = router;