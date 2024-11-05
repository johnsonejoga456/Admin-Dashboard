import React, { useState, useEffect } from 'react';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';
import DataTable from '../components/DataTable';
import { useNotification } from '../context/NotificationContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({ name: '', product: '', trackingId: '', date: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const handleSaveOrder = async () => {
    if (isEditing) {
      await updateOrder(currentOrder.id, currentOrder);
      addNotification('Order updated successfully', 'success'); // Trigger notification for update
    } else {
      await createOrder(currentOrder);
      addNotification('Order created successfully', 'success'); // Trigger notification for creation
    }
    setCurrentOrder({ name: '', product: '', trackingId: '', date: '', status: '' });
    setIsEditing(false);
    const updatedOrders = await fetchOrders();
    setOrders(updatedOrders);
  };

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setIsEditing(true);
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    addNotification('Order deleted successfully', 'success'); // Trigger notification for deletion
    const updatedOrders = await fetchOrders();
    setOrders(updatedOrders);
  };

  const orderColumns = [
    { field: 'name', headerName: 'Name' },
    { field: 'product', headerName: 'Product' },
    { field: 'trackingId', headerName: 'Tracking ID' },
    { field: 'date', headerName: 'Date' },
    { 
      field: 'status', 
      headerName: 'Status', 
      renderCell: (row) => (
        <span className={`py-1 px-3 rounded-full text-white ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEditOrder(row)} className="text-blue-600 hover:underline">Edit</button>
          <button onClick={() => handleDeleteOrder(row.id)} className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 min-h-screen rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Management</h2>

      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={currentOrder.name}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="product"
          placeholder="Product"
          value={currentOrder.product}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="trackingId"
          placeholder="Tracking ID"
          value={currentOrder.trackingId}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={currentOrder.date}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <select
          name="status"
          value={currentOrder.status}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={handleSaveOrder}
          className={`p-2 rounded-md ${isEditing ? 'bg-yellow-500' : 'bg-green-500'} text-white w-full`}
        >
          {isEditing ? 'Update Order' : 'Create Order'}
        </button>
      </div>

      <DataTable columns={orderColumns} data={orders} />
    </div>
  );
};

export default Orders;
