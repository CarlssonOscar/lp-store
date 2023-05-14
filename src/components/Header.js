import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";

const Header = () => {
    const { calculateCartItems } = useContext(StoreContext);
    const cartItemsCount = calculateCartItems();

    return (
        <header className="header">
            <Link to="/">LP STORE</Link>
            <Link to="/cart">
                CART {cartItemsCount > 0 ? cartItemsCount : ""}
            </Link>
        </header>
    );
};

export default Header;
