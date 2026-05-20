
const Order = require('../models/Order');
const Product = require('../models/Product');


// PLACE ORDER
// PLACE ORDER
exports.createOrder = async (req, res) => {

  try {

    // CREATE ORDER
    const newOrder = await Order.create({
      user: req.user._id,
      ...req.body
    });

    // UPDATE STOCK
    // UPDATE STOCK
for (const item of req.body.items) {

  const product = await Product.findById(
    item.productId
  );

  if (product) {

    if (product.stock < item.qty) {

      return res.status(400).json({
        message: `${product.name} is out of stock`
      });

    }

    product.stock = product.stock - item.qty;

    await product.save();

  }

}

    res.json(newOrder);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate('user', 'name email');

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};


// UPDATE ORDER STATUS
exports.updateOrderStatus = async (
  req,
  res
) => {

  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      });

    }

    order.orderStatus = req.body.status;

    await order.save();

    res.json({
      message: 'Status updated'
    });

  } catch (err) {

    res.status(500).json(err);

  }

};
// USER ORDERS
exports.getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id
    });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getOrderById = async (
  req,
  res
) => {

  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      });

    }

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.cancelOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      });

    }

    order.orderStatus = 'Cancelled';

    await order.save();

    res.json({
      message: 'Order Cancelled'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};