import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });
  const { addToCart } = useContext(CartContext);

  const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:5000/api/auth/register', form);

    alert("Registered successfully");

    // Optional: auto login after register
    const loginRes = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email: form.email, password: form.password }
    );

    localStorage.setItem('token', loginRes.data.token);
    localStorage.setItem('user', JSON.stringify(loginRes.data.user));

    // ✅ Handle pending product
    const pending = localStorage.getItem('pendingProduct');

    if (pending) {
      addToCart(JSON.parse(pending));
      localStorage.removeItem('pendingProduct');
    }

    window.location.href = '/';

  } catch (err) {
    alert(err.response.data.message);
  }
};

  return (
    <div className="container mt-4">
      <h2>Signup</h2>

      <input className="form-control mb-2" placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <input className="form-control mb-2" placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <input type="password" className="form-control mb-2" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})} />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default Register;