import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { createOrder, clearCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, getTotal, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState({
  email: '',
  firstName: '',
  lastName: '',
  country: 'India',
  streetAddress: '',
  apartment: '',
  city: '',
  state: 'Maharashtra',
  pincode: '',
  phone: ''
});

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {

  items: cart,

  orderItems: cart.map(item => ({
    product: item.productId,
    qty: item.qty
  })),

  shippingAddress: {
  fullName:
    address.firstName +
    ' ' +
    address.lastName,

  email: address.email,

  phone: address.phone,

  country: address.country,

  streetAddress: address.streetAddress,

  apartment: address.apartment,

  city: address.city,

  state: address.state,

  pincode: address.pincode
},

  totalAmount: getTotal(),

  paymentMethod: 'COD'

};

      await createOrder(orderData);

      alert('Order Placed Successfully');
      await clearCart();
      setCart([]);

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">

      <div className="row">

        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
<div className="col-lg-7">

  <div
    className="card border-0 rounded-4 p-4"
    style={{
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
    }}
  >

    <h3
      className="fw-bold mb-4"
      style={{
        letterSpacing: '-1px'
      }}
    >
      Billing & Shipping
    </h3>

    <div className="row">

      {/* EMAIL */}
      <div className="col-md-12 mb-3">

        <label className="form-label fw-semibold">
          Email *
        </label>

        <input
          type="email"
          className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

      </div>

      {/* FIRST NAME */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          First Name *
        </label>

        <input
          type="text"
         className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
        />

      </div>

      {/* LAST NAME */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          Last Name *
        </label>

        <input
          type="text"
          className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
        />

      </div>

      {/* COUNTRY */}
      <div className="col-md-12 mb-3">

        <label className="form-label fw-semibold">
          Country / Region *
        </label>

        <input
          type="text"
          className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          name="country"
          value={address.country}
          onChange={handleChange}
        />

      </div>

      {/* STREET ADDRESS */}
      <div className="col-md-12 mb-3">

        <label className="form-label fw-semibold">
          Street Address *
        </label>

        <input
          type="text"
          className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Street Address"
          name="streetAddress"
          onChange={handleChange}
        />

      </div>

      {/* APARTMENT */}
      <div className="col-md-12 mb-3">

        <input
          type="text"
         className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Apartment, suite, unit, etc. (optional)"
          name="apartment"
          onChange={handleChange}
        />

      </div>

      {/* CITY */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          Town / City *
        </label>

        <input
          type="text"
          className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Town / City"
          name="city"
          onChange={handleChange}
        />

      </div>

      {/* STATE */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          State *
        </label>

        <input
          type="text"
        className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          name="state"
          value={address.state}
          onChange={handleChange}
        />

      </div>

      {/* PINCODE */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          PIN Code *
        </label>

        <input
          type="text"
         className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Postcode / ZIP"
          name="pincode"
          onChange={handleChange}
        />

      </div>

      {/* MOBILE */}
      <div className="col-md-6 mb-3">

        <label className="form-label fw-semibold">
          Mobile Number *
        </label>

        <input
          type="text"
         className="form-control"
style={{
  height: '52px',
  borderRadius: '12px',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  boxShadow: 'none'
}}
          placeholder="Mobile Number"
          name="phone"
          onChange={handleChange}
        />

      </div>

    </div>

  </div>

</div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5">

          <div className="card shadow border-0 rounded-4 p-4">

            <h3 className="fw-bold mb-4">
              Order Summary
            </h3>

            {/* Products */}
            {cart.map(item => (
              <div
                key={item.productId}
                className="d-flex align-items-center mb-3 border-bottom pb-3"
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />

                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1">
                    {item.name}
                  </h6>

                  <small className="text-muted">
                    Qty: {item.qty}
                  </small>
                </div>

                <div className="fw-bold">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="d-flex justify-content-between mt-4 mb-3">
              <h5>Total</h5>

              <h4 className="fw-bold text-success">
                ₹{getTotal()}
              </h4>
            </div>

            {/* Payment */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">
                Payment Method
              </h6>

              <div className="border rounded-3 p-3 bg-light">
                Cash on Delivery
              </div>
            </div>

            {/* Button */}
            <button
              className="btn btn-dark btn-lg w-100 rounded-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;