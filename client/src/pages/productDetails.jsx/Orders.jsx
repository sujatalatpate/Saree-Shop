import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem('token');

      const res = await axios.get(
        'http://localhost:5000/api/orders/my-orders',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      className="container py-5"
      style={{
        minHeight: '100vh',
        background: '#f8f8f8'
      }}
    >

      {/* PAGE HEADER */}
      <div className="mb-5">

        <h1
          className="fw-bold"
          style={{
            fontSize: '42px',
            letterSpacing: '-1px',
            color: '#111'
          }}
        >
          My Orders
        </h1>

        <p
          className="text-muted mb-0"
          style={{
            fontSize: '16px'
          }}
        >
          Track your recent purchases and delivery status
        </p>

      </div>

      {orders.length === 0 ? (

        <div
          className="text-center py-5 bg-white rounded-4 shadow-sm"
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt=""
            style={{
              width: '120px',
              opacity: 0.7
            }}
          />

          <h4 className="mt-4 fw-bold">
            No Orders Found
          </h4>

          <p className="text-muted">
            Looks like you haven't placed any order yet.
          </p>

        </div>

      ) : (

        orders.map(order => (

          <div
            key={order._id}
            className="card border-0 mb-4 overflow-hidden"
            style={{
              borderRadius: '24px',
              boxShadow:
                '0 10px 30px rgba(0,0,0,0.06)',
              transition: '0.3s ease'
            }}
          >

            <div className="card-body p-4">

              {/* TOP SECTION */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div>

                  <p
                    className="text-muted mb-1"
                    style={{
                      fontSize: '13px',
                      letterSpacing: '1px'
                    }}
                  >
                    ORDER ID
                  </p>

                  <h5
                    className="fw-bold mb-0"
                    style={{
                      color: '#111'
                    }}
                  >
                    #{order._id.slice(-6)}
                  </h5>

                </div>

                <span
                  className={`badge px-4 py-3 ${
                    order.orderStatus === 'Delivered'
                      ? 'bg-success'
                      : order.orderStatus === 'Shipped'
                      ? 'bg-warning text-dark'
                      : order.orderStatus === 'Cancelled'
                      ? 'bg-danger'
                      : 'bg-dark'
                  }`}
                  style={{
                    borderRadius: '30px',
                    fontSize: '13px',
                    letterSpacing: '0.5px'
                  }}
                >
                  {order.orderStatus}
                </span>

              </div>

              <hr className="my-4" />

              {/* PRODUCTS */}
              {order.items.map(item => (

                <div
                  key={item.productId}
                  className="d-flex align-items-center mb-4"
                >

                  <div
                    style={{
                      width: '95px',
                      height: '95px',
                      background: '#f4f4f4',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >

                    <img
                      src={item.image}
                      alt=""
                      className="w-100 h-100"
                      style={{
                        objectFit: 'cover'
                      }}
                    />

                  </div>

                  <div className="ms-4 flex-grow-1">

                    <h5
                      className="fw-semibold mb-2"
                      style={{
                        color: '#111'
                      }}
                    >
                      {item.name}
                    </h5>

                    <div className="d-flex gap-4 flex-wrap">

                      <p className="mb-0 text-muted">
                        Qty:
                        {' '}
                        <strong>
                          {item.qty}
                        </strong>
                      </p>

                      <p className="mb-0 text-muted">
                        Price:
                        {' '}
                        <strong>
                          ₹{item.price}
                        </strong>
                      </p>

                    </div>

                  </div>

                </div>

              ))}

              <hr />

              {/* BOTTOM */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">

                <div>

                  <p
                    className="text-muted mb-1"
                    style={{
                      fontSize: '14px'
                    }}
                  >
                    Total Amount
                  </p>

                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color: '#111'
                    }}
                  >
                    ₹{order.totalAmount}
                  </h3>

                </div>

                <button
                  className="btn btn-dark px-4 py-3"
                  style={{
                    borderRadius: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                  onClick={() =>
                    navigate(`/order/${order._id}`)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Orders;