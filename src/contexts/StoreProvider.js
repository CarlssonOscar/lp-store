import React, { useState, useEffect } from "react";
import StoreContext from "./StoreContext";
import { saveOrder } from "./localStorageUtils";

const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [lastOrder, setLastOrder] = useState({ items: 0, total: 0 });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/robots")
            .then((response) => response.json())
            .then((data) => setInventory(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const addToCart = (robot) => {
        const existingItem = cart.find((item) => item.robot.id === robot.id);
        const currentItem = inventory.find((item) => item.id === robot.id);
        if (currentItem.inStock > 0) {
            if (existingItem) {
                existingItem.quantity++;
            } else {
                setCart([...cart, { robot, quantity: 1 }]);
            }
            setInventory(
                inventory.map((item) =>
                    item.id === robot.id
                        ? { ...item, stock: item.inStock - 1 }
                        : item
                )
            );
        } else {
            alert("The item is currently out of stock.");
        }
    };

    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter((item) => item.robot.id !== itemToRemove.robot.id));
        setInventory(
            inventory.map((item) =>
                item.id === itemToRemove.robot.id
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
            (total, item) => total + item.robot.price * item.quantity,
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

    const handleCheckout = (orderData) => {
        saveOrder({
            ...orderData,
            cart,
            total: calculateTotalPrice(),
            items: calculateCartItems(),
        });
        emptyCart();
    };

    const searchRobots = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    return (
        <StoreContext.Provider
            value={{
                inventory: inventory.filter((robot) =>
                    robot.name.toLowerCase().includes(searchTerm)
                ),
                cart,
                addToCart,
                removeFromCart,
                calculateCartItems,
                calculateTotalPrice,
                emptyCart,
                lastOrder,
                handleCheckout,
                searchRobots,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
