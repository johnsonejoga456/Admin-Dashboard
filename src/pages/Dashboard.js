// src/pages/Dashboard.js

import React from 'react';
import { ChartBarIcon, ShoppingBagIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/solid';
import Card from '../components/Card';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const kpiMetrics = [
    { title: 'Sales', value: '$25,970', icon: <ShoppingBagIcon className="h-6 w-6 text-white" />, color: 'bg-purple-500' },
    { title: 'Revenue', value: '$14,270', icon: <CurrencyDollarIcon className="h-6 w-6 text-white" />, color: 'bg-pink-500' },
    { title: 'Expenses', value: '$4,270', icon: <ChartBarIcon className="h-6 w-6 text-white" />, color: 'bg-orange-400' },
    { title: 'Total Users', value: '1200', icon: <UserGroupIcon className="h-6 w-6 text-white" />, color: 'bg-blue-500' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', product: 'Laptop', trackingId: '100198234', date: '2024-10-30', status: 'Delivered' },
    { id: 2, user: 'Jane Smith', product: 'Headphones', trackingId: '100198235', date: '2024-10-29', status: 'Pending' },
    { id: 3, user: 'Alice Brown', product: 'Smartwatch', trackingId: '100198236', date: '2024-10-28', status: 'Cancelled' },
    { id: 4, user: 'Bob Green', product: 'Camera', trackingId: '100198237', date: '2024-10-27', status: 'Delivered' },
    { id: 5, user: 'Victoria Clinton', product: 'Game pad', trackingId: '100198238', date: '2024-10-30', status: 'Delivered' },
  ];

  const activityColumns = [
    { field: 'user', headerName: 'User' },
    { field: 'product', headerName: 'Product' },
    { field: 'trackingId', headerName: 'Tracking ID' },
    { field: 'date', headerName: 'Date' },
    { field: 'status', headerName: 'Status', renderCell: (row) => (
      <span className={`py-1 px-3 rounded-full text-white ${getStatusColor(row.status)}`}>
        {row.status}
      </span>
    )},
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  // Define salesData
  const salesData = [
    { date: '2024-10-01', sales: 3000 },
    { date: '2024-10-02', sales: 2400 },
    { date: '2024-10-03', sales: 3200 },
    { date: '2024-10-04', sales: 2800 },
    { date: '2024-10-05', sales: 4000 },
  ];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-300 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} title={metric.title} value={metric.value} icon={metric.icon} color={metric.color} />
        ))}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Sales Overview</h3>
        <Chart title="Sales Overview" data={salesData} xKey="date" yKey="sales" />
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Recent Activities</h3>
        <DataTable columns={activityColumns} data={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
