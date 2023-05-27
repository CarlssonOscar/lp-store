// Function to save the order data to the localStorage.
export const saveOrder = (order) => {
    console.log("saveOrder called"); // Add this line
    const orderId = "order_" + new Date().getTime(); // Create a unique order id.
    const orderData = JSON.stringify(order); // Convert order data into a JSON string.
    localStorage.setItem(orderId, orderData); // Store the order data in localStorage.
    localStorage.setItem("latest_order_key", orderId); // Store the latest order key in localStorage.
};

// Function to load the latest order from the localStorage.
export const loadLatestOrder = () => {
    const latestOrderKey = localStorage.getItem("latest_order_key"); // Get the latest order key from localStorage.
    const orderData = localStorage.getItem(latestOrderKey);
    console.log("Order" + orderData); // Get the order data using the latest order key.
    if (orderData) {
        return JSON.parse(orderData); // If order data exists, convert JSON string back to order object and return it.
    }
    return null; // If no order data exists, return null.
};
