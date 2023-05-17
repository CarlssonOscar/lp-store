import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/Checkout.css"; // Import the CSS file

const Checkout = () => {
    const { calculateCartItems, calculateTotalPrice, handleCheckout } =
        useContext(StoreContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        const orderData = {
            name: name,
            address: address,
            city: city,
            country: country,
            date: new Date(),
        };

        handleCheckout(orderData);
        navigate("/confirmation");
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={onSubmit}>
                <h3>Shipping Information</h3>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <h3>Payment Information</h3>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Card Holder Name"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Card Number"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                    required
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="CVV"
                    required
                />

                <h3>Order Summary</h3>
                <p>{calculateCartItems()} items</p>
                <p>Total: ${calculateTotalPrice().toFixed(2)}</p>

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default Checkout;
