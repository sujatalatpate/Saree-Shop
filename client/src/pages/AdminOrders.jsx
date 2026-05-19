import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/api';

function AdminOrders() {

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        const res = await getAllOrders();

        setOrders(res.data);
    };

    const handleStatus = async (id, status) => {

        await updateOrderStatus(id, status);

        fetchOrders();
    };

    return (

        <div className="container py-5">

            <h2 className="fw-bold mb-4">
                Manage Orders
            </h2>

            {orders.map(order => (

                <div
                    key={order._id}
                    className="card shadow-sm border-0 rounded-4 mb-4"
                >

                    <div className="card-body">

                        {/* CUSTOMER */}
                        <h5>
                            Customer:
                            {' '}
                            {order.shippingAddress.fullName}
                        </h5>

                        <p className="text-muted mb-1">
                            {order.shippingAddress.city},
                            {' '}
                            {order.shippingAddress.state}
                        </p>

                        <p className="text-muted">
                            {order.shippingAddress.phone}
                        </p>

                        <hr />
                        <p className="text-muted">
                            Ordered On:
                            {' '}
                            {new Date(order.createdAt)
                                .toLocaleDateString()}
                        </p>

                        {/* PRODUCTS */}
                        {order.items.map(item => (

                            <div
                                key={item.productId}
                                className="d-flex align-items-center mb-3"
                            >

                                <img
                                    src={item.image}
                                    alt=""
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />

                                <div className="ms-3">

                                    <h6>
                                        {item.name}
                                    </h6>

                                    <p className="mb-0">
                                        Qty: {item.qty}
                                    </p>

                                    <strong>
                                        ₹{item.price}
                                    </strong>

                                </div>

                            </div>

                        ))}

                        <hr />

                        {/* STATUS */}
                        <div className="d-flex justify-content-between align-items-center">

                            <h5>
                                Total:
                                {' '}
                                ₹{order.totalAmount}
                            </h5>
                            <p>
  Payment:
  {' '}
  <strong>
    {order.paymentMethod}
  </strong>
</p>
<p>
  Items:
  {' '}
  {order.items.length}
</p>

                            <span
                                className={`badge px-3 py-2 mb-3 ${order.orderStatus === 'Delivered'
                                    ? 'bg-success'
                                    : order.orderStatus === 'Cancelled'
                                        ? 'bg-danger'
                                        : order.orderStatus === 'Shipped'
                                            ? 'bg-warning text-dark'
                                            : 'bg-secondary'
                                    }`}
                            >
                                {order.orderStatus}
                            </span>

                            <select
                                className="form-select w-auto"
                                value={order.orderStatus}
                                onChange={(e) =>
                                    handleStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                            >

                                <option>
                                    Processing
                                </option>

                                <option>
                                    Shipped
                                </option>

                                <option>
                                    Out For Delivery
                                </option>

                                <option>
                                    Delivered
                                </option>

                                <option>
                                    Cancelled
                                </option>
                            </select>

                        </div>

                    </div>

                </div>

            ))}
            

        </div>
        

    );
}

export default AdminOrders;