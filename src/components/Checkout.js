import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/Checkout.css";

const Checkout = () => {
    const { calculateCartItems, calculateTotalPrice, handleCheckout } =
        useContext(StoreContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        // Remove spaces and dashes from card number for validation
        const cleanedCardNumber = cardNumber.replace(/[\s-]/g, "");

        // Check that the cleaned card number is exactly 16 digits
        if (!/^\d{16}$/.test(cleanedCardNumber)) {
            alert("Invalid card number. Please enter a 16-digit number.");
            return;
        }

        // Check that the expiry date follows the MM/YY format
        const expiryDateParts = expiryDate.split("/");
        if (
            !/^([0-9]{2}\/[0-9]{2})$/.test(expiryDate) ||
            expiryDateParts.length !== 2 ||
            +expiryDateParts[0] < 1 ||
            +expiryDateParts[0] > 12
        ) {
            alert("Invalid expiry date. Please enter in the format MM/YY.");
            return;
        }

        // Check that the expiry date is in the future
        const expiryYear = +("20" + expiryDateParts[1]);
        const expiryMonth = +expiryDateParts[0];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            alert("Invalid expiry date. The date must be in the future.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const orderData = {
            name: name,
            address: address,
            city: city,
            country: country,
            email: email,
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
                <input
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
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
