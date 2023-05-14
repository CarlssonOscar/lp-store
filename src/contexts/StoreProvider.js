import React, { useState } from "react";
import StoreContext from "./StoreContext";
import { saveOrder } from "./localStorageUtils";
import LPs from "../data/LPs";

const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [inventory, setInventory] = useState(LPs);
    const [lastOrder, setLastOrder] = useState({ items: 0, total: 0 });

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

    const calculateCartItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.lp.price * item.quantity,
            0
        );
    };

    const emptyCart = () => {
        setLastOrder({
            items: calculateCartItems(),
            total: calculateTotalPrice(),
        });
        setCart([]);
    };

    const handleCheckout = (event) => {
        // Save order
        saveOrder({
            cart,
            total: calculateTotalPrice(),
            items: calculateCartItems(),
        });
        emptyCart();
    };

    return (
        <StoreContext.Provider
            value={{
                inventory,
                cart,
                addToCart,
                removeFromCart,
                calculateCartItems,
                calculateTotalPrice,
                emptyCart,
                lastOrder,
                handleCheckout,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
