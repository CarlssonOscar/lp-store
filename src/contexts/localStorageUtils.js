export const saveOrder = (order) => {
    const orderData = JSON.stringify(order);
    const orderId = "order_" + new Date().getTime();
    localStorage.setItem(orderId, orderData);
};

export const loadOrders = () => {
    const keys = Object.keys(localStorage);
    const orderKeys = keys.filter((key) => key.startsWith("order_"));
    const orders = orderKeys.map((key) =>
        JSON.parse(localStorage.getItem(key))
    );
    return orders;
};
