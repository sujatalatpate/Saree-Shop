import axios from 'axios';

const API = axios.create({
  baseURL: 'https://saree-shop-jozn.onrender.com'
});

// TOKEN

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchProducts = () => API.get('/products');
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

export const fetchProductById = (id) => API.get(`/products/${id}`); // 👈 ADD THIS
export const createProduct = (formData) =>
  API.post(
    '/products',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );


export const fetchCart = () => API.get('/cart');
export const addCartItem = (data) => API.post('/cart', data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);
export const increaseCartItem = (id) => API.put(`/cart/increase/${id}`);
export const decreaseCartItem = (id) => API.put(`/cart/decrease/${id}`);
export const clearCart = () => API.delete('/cart/clear');

// CREATE ORDER
export const createOrder = (data) =>
  API.post('/orders', data);


// ADMIN GET ORDERS

export const getAllOrders = () =>
  API.get('/orders/all');


// UPDATE STATUS
export const updateOrderStatus = (
  id,
  status
) => {

  const token = localStorage.getItem('token');

  return axios.put(
    `http://localhost:5000/api/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

};

export const getWishlist = (userId) =>
  API.get(`/auth/wishlist/${userId}`);

export const toggleWishlistApi = (data) =>
  API.post('/auth/wishlist', data);

// USER ORDERS
export const getMyOrders = () =>
  API.get('/orders/my-orders');

export const addReview = (
  productId,
  data
) =>
  API.post(
    `/products/${productId}/reviews`,
    data
  );