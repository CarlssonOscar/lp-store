import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";

const Header = () => {
    const { calculateCartItems, searchLPs } = useContext(StoreContext);
    const cartItemsCount = calculateCartItems();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        searchLPs(searchQuery);
    };

    return (
        <header className="header">
            <Link to="/">LP STORE</Link>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search LPs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
            <Link to="/cart">
                CART {cartItemsCount > 0 ? cartItemsCount : ""}
            </Link>
            <Link to="/orders">ORDERS</Link>
        </header>
    );
};

export default Header;
