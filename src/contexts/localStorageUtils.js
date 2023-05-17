// Function to save the order data to the localStorage.
export const saveOrder = (order) => {
    const orderId = "order_" + new Date().getTime(); // Create a unique order id.
    const orderData = JSON.stringify(order); // Convert order data into a JSON string.
    localStorage.setItem(orderId, orderData); // Store the order data in localStorage.
    localStorage.setItem("latest_order_key", orderId); // Store the latest order key in localStorage.
};

// Function to load all the orders from the localStorage.
export const loadOrders = () => {
    const keys = Object.keys(localStorage); // Get all keys from localStorage.
    const orderKeys = keys.filter((key) => key.startsWith("order_")); // Filter out the order keys.
    const orders = orderKeys.map(
        (key) => JSON.parse(localStorage.getItem(key)) // Convert JSON string back to order object.
    );
    return orders; // Return all orders.
};

// Function to load the latest order from the localStorage.
export const loadLatestOrder = () => {
    const latestOrderKey = localStorage.getItem("latest_order_key"); // Get the latest order key from localStorage.
    const orderData = localStorage.getItem(latestOrderKey); // Get the order data using the latest order key.
    if (orderData) {
        return JSON.parse(orderData); // If order data exists, convert JSON string back to order object and return it.
    }
    return null; // If no order data exists, return null.
};
