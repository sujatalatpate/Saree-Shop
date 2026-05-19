const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getSingleProduct, addReview } = require('../controllers/productController.js');
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.array('images', 5),
  createProduct
);

router.post(
  '/:id/reviews',
  authMiddleware,
  addReview
);

module.exports = router;