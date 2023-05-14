// Checkout.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";

const Checkout = () => {
    const { calculateCartItems, calculateTotalPrice, handleCheckout } =
        useContext(StoreContext);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        handleCheckout();
        navigate("/confirmation"); // navigate to confirmation page
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={onSubmit}>
                <h3>Shipping Information</h3>
                <input type="text" placeholder="Name" required />
                <input type="text" placeholder="Address" required />
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="Country" required />

                <h3>Order Summary</h3>
                <p>{calculateCartItems()} items</p>
                <p>Total: ${calculateTotalPrice().toFixed(2)}</p>

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default Checkout;
