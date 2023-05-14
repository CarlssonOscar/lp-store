import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadOrders } from "../contexts/localStorageUtils";

const Confirmation = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = loadOrders();
        setOrders(savedOrders);
    }, []);

    if (!orders || orders.length === 0) {
        return <p>No orders found...</p>;
    }

    return (
        <div>
            <h2>Thank you for your order!</h2>
            <h3>Order Summary</h3>
            {/* assuming each order has a cart, total, and items properties */}
            {orders.map((order, index) => (
                <div key={index}>
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
            <Link to="/">Back to Store</Link>
        </div>
    );
};

export default Confirmation;
