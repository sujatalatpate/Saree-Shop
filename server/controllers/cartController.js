// const Cart = require('../models/Cart');


// // GET CART
// exports.getCart = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user.id });
//   res.json(cart || { items: [] });
// };

// // ADD TO CART
// exports.addToCart = async (req, res) => {
//   const userId = req.user.id;
//   const product = req.body;

//   // ✅ ALWAYS normalize
//   const productId = (product.productId || product._id).toString();

//   let cart = await Cart.findOne({ user: userId });
//   console.log("Incoming:", product);
// console.log("Normalized productId:", productId);
// console.log("Existing cart:", cart?.items);

//   if (!cart) {
//     cart = await Cart.create({
//       user: userId,
//       items: [{
//         productId,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1
//       }]
//     });
//   } else {
//     const item = cart.items.find(
//       i => i.productId.toString() === productId
//     );

//     if (item) {
//       item.qty += 1;   // ✅ increase quantity
//     } else {
//       cart.items.push({
//         productId,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1
//       });
//     }

//     await cart.save();
//   }

//   res.json(cart);
// };
// // REMOVE ITEM
// exports.removeFromCart = async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.params;

//   let cart = await Cart.findOne({ user: userId });

//   if (cart) {
//     cart.items = cart.items.filter(
//       item => item.productId.toString() !== productId.toString()
//     );

//     await cart.save();
//   }

//   res.json(cart);
// };
// exports.increaseQty = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user.id });

//   const item = cart.items.find(
//     i => i.productId.toString() === req.params.productId
//   );

//   if (item) item.qty += 1;

//   await cart.save();
//   res.json(cart);
// };
// exports.decreaseQty = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user.id });

//   const item = cart.items.find(
//     i => i.productId.toString() === req.params.productId
//   );

//   if (item) {
//     if (item.qty > 1) {
//       item.qty -= 1;
//     } else {
//       cart.items = cart.items.filter(
//         i => i.productId.toString() !== req.params.productId
//       );
//     }
//   }

//   await cart.save();
//   res.json(cart);
// };

const Cart = require('../models/Cart');

// GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  });

  res.json(cart || { items: [] });
};

// ADD TO CART
exports.addToCart = async (req, res) => {

  const userId = req.user.id;
  const product = req.body;

  const cartItem = {
    productId: product.productId,
    name: product.name,
    price: product.price,

    // ✅ FIXED IMAGE
    image:
      product.images?.length > 0
        ? product.images[0]
        : product.image,

    qty: 1
  };

  let cart = await Cart.findOne({
    user: userId
  });

  if (!cart) {

    cart = await Cart.create({
      user: userId,
      items: [cartItem]
    });

  } else {

    const existingItem = cart.items.find(
      item => item.productId === product.productId
    );

    if (existingItem) {

      existingItem.qty += 1;

    } else {

      cart.items.push(cartItem);

    }

    await cart.save();
  }

  res.json(cart);
};
// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  });

  cart.items = cart.items.filter(
    item => item.productId !== req.params.productId
  );

  await cart.save();

  res.json(cart);
};

// INCREASE QTY
exports.increaseQty = async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  });

  const item = cart.items.find(
    i => i.productId === req.params.productId
  );

  if (item) {
    item.qty += 1;
  }

  await cart.save();

  res.json(cart);
};

// DECREASE QTY
exports.decreaseQty = async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  });

  const item = cart.items.find(
    i => i.productId === req.params.productId
  );

  if (item && item.qty > 1) {
    item.qty -= 1;
  }

  await cart.save();

  res.json(cart);
};

exports.clearCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({
      message: 'Cart cleared'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};