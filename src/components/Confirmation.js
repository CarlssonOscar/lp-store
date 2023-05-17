import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadLatestOrder } from "../contexts/localStorageUtils";
import "../styles/Confirmation.css";

const Confirmation = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = loadLatestOrder();
        setOrder(savedOrder);
    }, []);

    if (!order) {
        return <p>No orders found...</p>;
    }

    return (
        <div className="confirmation-container">
            <h2>Thank you for your order!</h2>
            <h3>Order Summary</h3>
            {order.cart &&
                order.cart.map((item, index) => (
                    <div key={index}>
                        <p>Title: {item.lp.title}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            <p>Total items: {order.items}</p>
            <p>Total: ${order.total?.toFixed(2)}</p>
            <Link to="/">Back to Store</Link>
        </div>
    );
};

export default Confirmation;
