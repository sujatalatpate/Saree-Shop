import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { registerUser, loginUser } from '../services/api.jsx';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

 const handleSubmit = async () => {

  try {

    await registerUser(form);

    const loginRes = await loginUser({
      email: form.email,
      password: form.password
    });

    localStorage.setItem(
      'token',
      loginRes.data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(loginRes.data.user)
    );

    navigate('/');

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

      <button   type="button" className="btn btn-primary" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default Register;