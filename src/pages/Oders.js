import React, { useState } from 'react';
import DataTable from '../components/DataTable';

// Define available statuses and mock data for orders
const STATUS_OPTIONS = ['All', 'Completed', 'Pending', 'Shipped', 'Cancelled'];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Define columns for the orders table
  const columns = [
    { field: 'id', headerName: 'Order ID' },
    { field: 'customer', headerName: 'Customer' },
    { field: 'total', headerName: 'Total Amount' },
    { field: 'status', headerName: 'Status' },
    { field: 'date', headerName: 'Order Date' },
    { field: 'actions', headerName: 'Actions', renderCell: (order) => (
      <div>
        <button onClick={() => viewOrder(order.id)} className="text-blue-500 mr-2">View</button>
        <button onClick={() => editOrder(order.id)} className="text-yellow-500 mr-2">Edit</button>
        <button onClick={() => cancelOrder(order.id)} className="text-red-500">Cancel</button>
      </div>
    )},
  ];

  // Mock data for orders
  const data = [
    { id: 101, customer: 'John Doe', total: '$200', status: 'Completed', date: '2024-01-15' },
    { id: 102, customer: 'Jane Smith', total: '$350', status: 'Pending', date: '2024-01-16' },
    { id: 103, customer: 'Alice Johnson', total: '$120', status: 'Cancelled', date: '2024-01-17' },
    { id: 104, customer: 'Bob Brown', total: '$450', status: 'Shipped', date: '2024-01-18' },
  ];

  // Filter data based on search term and status
  const filteredData = data.filter(order => 
    (statusFilter === 'All' || order.status === statusFilter) &&
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Placeholder functions for actions
  const viewOrder = (id) => alert(`Viewing order #${id}`);
  const editOrder = (id) => alert(`Editing order #${id}`);
  const cancelOrder = (id) => alert(`Canceling order #${id}`);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      
      {/* Filters */}
      <div className="mb-6 flex items-center">
        <input 
          type="text" 
          placeholder="Search by customer name" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="border p-2 mr-4"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="border p-2"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Orders;
