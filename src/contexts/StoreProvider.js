import React, { useState } from "react";
import StoreContext from "./StoreContext";
import { saveOrder } from "./localStorageUtils";
import LPs from "../data/LPs";

// The StoreProvider component holds the main logic and state for the store.
// It provides the context values that will be used throughout the app.
const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State for the cart.
    const [inventory, setInventory] = useState(LPs); // State for the inventory.
    const [lastOrder, setLastOrder] = useState({ items: 0, total: 0 }); // State for the last order.
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term.

    // Function to add an item to the cart.
    const addToCart = (lp) => {
        const existingItem = cart.find((item) => item.lp.id === lp.id);

        // Get the current item from the inventory
        const currentItem = inventory.find((item) => item.id === lp.id);

        // Only add the item to the cart if it's in stock
        if (currentItem.stock > 0) {
            if (existingItem) {
                existingItem.quantity++;
            } else {
                setCart([...cart, { lp, quantity: 1 }]);
            }
            // Update inventory
            setInventory(
                inventory.map((item) =>
                    item.id === lp.id
                        ? { ...item, stock: item.stock - 1 }
                        : item
                )
            );
        } else {
            alert("The item is currently out of stock.");
        }
    };

    // Function to remove an item from the cart.
    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter((item) => item.lp.id !== itemToRemove.lp.id));
        // Update inventory
        setInventory(
            inventory.map((item) =>
                item.id === itemToRemove.lp.id
                    ? { ...item, stock: item.stock + 1 }
                    : item
            )
        );
    };

    // Function to calculate the total number of items in the cart.
    const calculateCartItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Function to calculate the total price of the items in the cart.
    const calculateTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.lp.price * item.quantity,
            0
        );
    };

    // Function to clear the cart.
    const emptyCart = () => {
        setLastOrder({
            items: calculateCartItems(),
            total: calculateTotalPrice(),
        });
        setCart([]);
    };

    // Function to handle checkout.
    const handleCheckout = (orderData) => {
        saveOrder({
            ...orderData,
            cart,
            total: calculateTotalPrice(),
            items: calculateCartItems(),
        });
        emptyCart();
    };

    // Function to search LPs.
    const searchLPs = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    return (
        // The StoreContext.Provider component provides the state and functions to its children.
        <StoreContext.Provider
            value={{
                inventory: inventory.filter((lp) =>
                    lp.title.toLowerCase().includes(searchTerm)
                ),
                cart,
                addToCart,
                removeFromCart,
                calculateCartItems,
                calculateTotalPrice,
                emptyCart,
                lastOrder,
                handleCheckout,
                searchLPs,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
