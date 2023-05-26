import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";

const Header = () => {
    const { calculateCartItems, searchRobots } = useContext(StoreContext);
    const cartItemsCount = calculateCartItems();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        searchRobots(searchQuery);
    };

    return (
        <header className="header">
            <Link to="/">ROBOT STORE</Link>
            <Link to="/cart">
                CART {cartItemsCount > 0 ? cartItemsCount : ""}
            </Link>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Robots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </header>
    );
};

export default Header;
