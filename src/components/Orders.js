import React, { useEffect, useState } from "react";
import { loadOrders } from "../contexts/localStorageUtils";
import "../styles/Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = loadOrders();
        setOrders(savedOrders);
    }, []);

    if (!orders || orders.length === 0) {
        return <p>No orders found...</p>;
    }

    return (
        <div className="order-list">
            <h2>Orders</h2>
            {orders.map((order, index) => (
                <div className="order-item" key={index}>
                    <h3>Customer Information</h3>
                    <p>Order Date: {new Date(order.date).toLocaleString()}</p>
                    <p>Name: {order.name}</p>{" "}
                    {/* assuming order has name property */}
                    <p>Address: {order.address}</p>{" "}
                    {/* assuming order has address property */}
                    <p>City: {order.city}</p>{" "}
                    {/* assuming order has city property */}
                    <p>Country: {order.country}</p>{" "}
                    {/* assuming order has country property */}
                    <h3>Order Summary</h3>
                    {/* assuming each order has a cart, total, and items properties */}
                    {order.cart &&
                        order.cart.map((item, index) => (
                            <div key={index}>
                                <p>Title: {item.lp.title}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    <p>Total items: {order.items}</p>
                    <p>Total: ${order.total?.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default Orders;
