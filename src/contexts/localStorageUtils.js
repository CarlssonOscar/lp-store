export const saveOrder = (order) => {
    const orderId = "order_" + new Date().getTime();
    const orderData = JSON.stringify(order);
    localStorage.setItem(orderId, orderData);
    localStorage.setItem("latest_order_key", orderId);
};

export const loadOrders = () => {
    const keys = Object.keys(localStorage);
    const orderKeys = keys.filter((key) => key.startsWith("order_"));
    const orders = orderKeys.map((key) =>
        JSON.parse(localStorage.getItem(key))
    );
    return orders;
};

export const loadLatestOrder = () => {
    const latestOrderKey = localStorage.getItem("latest_order_key");
    const orderData = localStorage.getItem(latestOrderKey);
    if (orderData) {
        return JSON.parse(orderData);
    }
    return null;
};
