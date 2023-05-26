import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/Cart.css";

const Cart = () => {
    const { cart, removeFromCart } = useContext(StoreContext);

    const calculateTotal = () => {
        return cart.reduce(
            (acc, item) => acc + item.robot.price * item.quantity,
            0
        );
    };

    if (!cart.length) {
        return (
            <div className="cart-empty">
                <h2>Your cart is empty</h2>
                <Link to="/">Continue Shopping</Link>
            </div>
        );
    }
    return (
        <div className="cart-container">
            {cart.map((item) => (
                <div key={item.robot.id} className="cart-item">
                    <img
                        src={item.robot.image}
                        alt={item.robot.name}
                        className="cart-image"
                    />
                    <h2>{item.robot.name}</h2>
                    <p>${item.robot.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item)}>
                        Remove from Cart
                    </button>
                </div>
            ))}
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            <Link to="/">Continue Shopping</Link>
            <Link to="/checkout">
                <button>Proceed to Checkout</button>
            </Link>
        </div>
    );
};

export default Cart;
