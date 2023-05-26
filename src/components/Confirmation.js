import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadLatestOrder } from "../contexts/localStorageUtils";
import "../styles/Confirmation.css";

const Confirmation = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = loadLatestOrder();
        setOrder(savedOrder);

        const sendOrderToServer = async (order) => {
            // Check if the order exists
            if (!order) throw new Error("No order to send!");

            // Iterate over each item in the order
            for (let item of order.cart) {
                // Send a PATCH request to update the stock
                const response = await fetch(
                    `http://localhost:3001/robots/${item.robot.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            inStock: item.robot.inStock - item.quantity,
                        }),
                    }
                );

                // Check for errors
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Send the order to the server
            const response = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            // Check for errors
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
        };

        if (savedOrder) {
            try {
                sendOrderToServer(savedOrder);
            } catch (error) {
                console.error(error);
            }
        }
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
                        <p>Name: {item.robot.name}</p>
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
