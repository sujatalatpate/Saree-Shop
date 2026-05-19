import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/api.jsx';
import { fetchCart, addCartItem, removeCartItem, decreaseCartItem, increaseCartItem  } from '../services/api.jsx';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

    // ✅ Load cart from DB on refresh
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart();
        setCart(res.data.items || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (localStorage.getItem('token')) {
      loadCart();
    }
  }, []);
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem('cart')) || [];
//   });

  // Save to localStorage whenever cart changes
// useEffect(() => {
//   const getCartData = async () => {
//     try {
//       const res = await fetchProducts();
//       setCart(res.data?.items || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const token = localStorage.getItem('token');
//   if (token) {
//     getCartData();
//   }

// }, []);




//   const addToCart = (product) => {
//     const exists = cart.find(item => item._id === product._id);

//     if (exists) {
//       setCart(cart.map(item =>
//         item._id === product._id
//           ? { ...item, qty: item.qty + 1 }
//           : item
//       ));
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };
   

//   const removeFromCart = (id) => {
//     setCart(cart.filter(item => item._id !== id));
//   };
//   const getTotal = () => {
//   return cart.reduce((total, item) => {
//     return total + item.price * item.qty;
//   }, 0);
// };

const addToCart = async (product) => {

  const cartItem = {
    productId: product._id,
    name: product.name,
    price: product.price,

    // ✅ IMPORTANT
    image:
      product.images?.length > 0
        ? product.images[0]
        : product.image,

    qty: 1
  };

  const res = await addCartItem(cartItem);

  setCart(res.data.items);
};

const removeFromCart = async (id) => {
  const res = await removeCartItem(id);
  setCart(res.data.items);
};
const increaseQty = async (id) => {
  const res = await increaseCartItem(id);
  setCart(res.data.items);
};

const decreaseQty = async (id) => {
  const res = await decreaseCartItem(id);
  setCart(res.data.items);
};

  const getTotal = () => {
    return cart.reduce((t, i) => t + i.price * i.qty, 0);
  };

// const decreaseQty = (id) => {
//     setCart(cart.map(item =>
//       item._productId === id && item.qty > 1
//         ? { ...item, qty: item.qty - 1 }
//         : item
//     ));
//   };
// DECREASE QTY
// const decreaseQty = async (req, res) => {
//   const cart = await cart.findOne({ user: req.user.id });

//   const item = cart.items.find(
//     i => i.productId.toString() === req.params.productId
//   );

//   if (item) {
//     if (item.qty > 1) {
//       item.qty -= 1;
//     } else {
//       // remove if qty = 1
//       cart.items = cart.items.filter(
//         i => i.productId.toString() !== req.params.productId
//       );
//     }
//   }

//   await cart.save();
//   res.json(cart);
// };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, getTotal, decreaseQty, increaseQty }}>
      {children}
    </CartContext.Provider>
  );
};