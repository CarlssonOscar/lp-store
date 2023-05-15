import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/Cart.css"; // Import your CSS file

const Cart = () => {
    const { cart, removeFromCart } = useContext(StoreContext);

    const calculateTotal = () => {
        return cart.reduce(
            (acc, item) => acc + item.lp.price * item.quantity,
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
    //heje
    return (
        <div className="cart-container">
            {cart.map((item) => (
                <div key={item.lp.id} className="cart-item">
                    <img
                        src={item.lp.image}
                        alt={item.lp.title}
                        className="cart-image"
                    />
                    <h2>{item.lp.title}</h2>
                    <p>{item.lp.artist}</p>
                    <p>${item.lp.price}</p>
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
