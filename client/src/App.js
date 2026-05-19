import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from './components/Navbar/Navbar';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart/Cart.jsx';
import ProductDetail from './pages/productDetails.jsx/productDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import AdminAddProduct from './pages/AdminAddProduct.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Orders from './pages/productDetails.jsx/Orders.jsx';
import OrderDetails from './pages/orderDetails.jsx';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route
            path="/admin/add-product"
            element={<AdminAddProduct />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/order/:id"
            element={<OrderDetails />}
          />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;