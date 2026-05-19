import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';

function Cart() {

  const {
    cart,
    decreaseQty,
    removeFromCart,
    getTotal,
    increaseQty
  } = useContext(CartContext);

  const navigate = useNavigate();

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">

        <div className="card shadow border-0 rounded-4 p-5">

          <h1 className="display-5 mb-3">
            🛒
          </h1>

          <h3 className="fw-bold">
            Your Cart is Empty
          </h3>

          <p className="text-muted">
            Add beautiful sarees to continue shopping
          </p>

          <button
            className="btn btn-dark px-4 py-2 rounded-3 mt-3"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (

    <div className="container py-4">

      <div className="row g-4">

        {/* LEFT SIDE */}
        <div className="col-lg-8">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">
              Shopping Cart
            </h2>

            <span className="text-muted">
              {cart.length} Items
            </span>
          </div>

          {cart.map(item => (

            <div
              key={item.productId}
              className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden"
            >

              <div className="row g-0 align-items-center">

                {/* IMAGE */}
                <div className="col-md-3 text-center p-3">

                  <img
                    src={item.image}
                    alt=""
                    className="img-fluid rounded-4"
                    style={{
                      height: "180px",
                      objectFit: "cover"
                    }}
                  />

                </div>

                {/* DETAILS */}
                <div className="col-md-5">

                  <div className="card-body">

                    <h4 className="fw-bold mb-2">
                      {item.name}
                    </h4>

                    <p className="text-muted mb-2">
                      Premium Saree Collection
                    </p>

                    <h5 className="text-dark fw-bold">
                      ₹{item.price}
                    </h5>

                    <p className="text-success small">
                      Free Delivery Available
                    </p>

                  </div>

                </div>

                {/* QUANTITY */}
                <div className="col-md-2 text-center">

                  <div className="d-flex justify-content-center align-items-center gap-2">

                    <button
                      className="btn btn-outline-dark rounded-circle"
                      style={{
                        width: "35px",
                        height: "35px"
                      }}
                      onClick={() => decreaseQty(item.productId)}
                      disabled={item.qty === 1}
                    >
                      -
                    </button>

                    <span className="fw-bold fs-5">
                      {item.qty}
                    </span>

                    <button
                      className="btn btn-dark rounded-circle"
                      style={{
                        width: "35px",
                        height: "35px"
                      }}
                      onClick={() => increaseQty(item.productId)}
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* PRICE */}
                <div className="col-md-2 text-center">

                  <h5 className="fw-bold">
                    ₹{item.price * item.qty}
                  </h5>

                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill mt-2"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">

          <div className="card border-0 shadow rounded-4 p-4 sticky-top">

            <h3 className="fw-bold mb-4">
              Price Details
            </h3>

            <div className="d-flex justify-content-between mb-3">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Delivery</span>
              <span className="text-success">
                FREE
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Discount</span>
              <span className="text-success">
                ₹100
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">

              <h5 className="fw-bold">
                Total Amount
              </h5>

              <h4 className="fw-bold text-success">
                ₹{getTotal() - 100}
              </h4>

            </div>

            <button
              className="btn btn-dark btn-lg rounded-4 w-100"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <p className="text-muted small text-center mt-3 mb-0">
              Safe & Secure Payments
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Cart;