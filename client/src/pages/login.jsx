import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';



function Login() {
  const [form, setForm] = useState({
    email: '', password: ''
  });
  const { addToCart } = useContext(CartContext);

//  const handleLogin = async () => {
//   try {
//     const res = await axios.post(
//       'http://localhost:5000/api/auth/login',
//       form
//     );

//     localStorage.setItem('token', res.data.token);
//     // localStorage.setItem('user', JSON.stringify(res.data.user));
//     localStorage.setItem(
//   'user',
//   JSON.stringify(res.data.user)
// );

// localStorage.setItem(
//   'token',
//   res.data.token
// );

//     // ✅ Handle pending product
//     const pending = localStorage.getItem('pendingProduct');

//     if (pending) {
//       addToCart(JSON.parse(pending));
//       localStorage.removeItem('pendingProduct');
//     }

//    navigate('/');

//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

const navigate = useNavigate();

const handleLogin = async () => {
  try {

    const res = await axios.post(
      'http://localhost:5000/api/auth/login',
      form
    );

    localStorage.setItem(
      'user',
      JSON.stringify(res.data.user)
    );

    localStorage.setItem(
      'token',
      res.data.token
    );

    const pending =
      localStorage.getItem('pendingProduct');

    if (pending) {

      addToCart(JSON.parse(pending));

      localStorage.removeItem('pendingProduct');

    }

    navigate('/');

  } catch (err) {

    alert(err.response.data.message);

  }
};

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      <input className="form-control mb-2" placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <input type="password" className="form-control mb-2" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})} />

      <button   type="button" className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
      <div>
        <p className="mt-3">
  Don’t have an account? <Link to="/register">Register</Link>
</p>
      </div>
    </div>
  );
}

export default Login;