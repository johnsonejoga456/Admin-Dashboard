const LOCAL_STORAGE_KEY = 'orders';

// Fetch all orders from local storage
export const fetchOrders = async () => {
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  return orders;
};

// Create a new order and save it to local storage
export const createOrder = async (order) => {
  const orders = await fetchOrders();
  orders.push({ ...order, id: orders.length + 1 });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  return order;
};

// Update an existing order and save it to local storage
export const updateOrder = async (orderId, updatedOrder) => {
  const orders = await fetchOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    return updatedOrder;
  }
};

// Delete an order from local storage
export const deleteOrder = async (orderId) => {
  const orders = await fetchOrders();
  const updatedOrders = orders.filter(order => order.id !== orderId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
};
