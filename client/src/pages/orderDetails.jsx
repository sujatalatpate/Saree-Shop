import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    fetchOrder();

  }, []);

  const fetchOrder = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const res = await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrder(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!order) {

    return (
      <div className="text-center py-5">
        Loading...
      </div>
    );

  }

  return (

    <div className="container py-5">

      <div className="card border-0 shadow rounded-4 p-4">

        <div className="d-flex justify-content-between mb-4">

          <h3 className="fw-bold">
            Order Details
          </h3>

          <span className="badge bg-dark p-3">
            {order.orderStatus}
          </span>

        </div>

        <h5 className="mb-3">
          Shipping Address
        </h5>

        <p>
          {order.shippingAddress.fullName}
        </p>

        <p>
          {order.shippingAddress.address}
        </p>

        <p>
          {order.shippingAddress.city}
        </p>

        <hr />

        {order.items.map(item => (

          <div
            key={item.productId}
            className="d-flex align-items-center mb-4"
          >

            <img
              src={item.image}
              alt=""
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />

            <div className="ms-3">

              <h6>
                {item.name}
              </h6>

              <p className="mb-1">
                Qty: {item.qty}
              </p>

              <strong>
                ₹{item.price}
              </strong>

            </div>

          </div>

        ))}

        <hr />

        <div className="d-flex justify-content-between">

          <h5>Total</h5>

          <h4 className="fw-bold">
            ₹{order.totalAmount}
          </h4>

        </div>
        {/* <button
  className="btn btn-danger mt-4"
>
  Cancel Order
</button> */}

      </div>

    </div>

  );

}

export default OrderDetails;