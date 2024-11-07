import React from 'react';
import Chart from '../components/Chart';

const Analytics = () => {
  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 300 },
    { month: 'May', users: 400 },
    { month: 'Jun', users: 500 },
    { month: 'Jul', users: 650 },
    { month: 'Aug', users: 800 },
    { month: 'Sep', users: 900 },
    { month: 'Oct', users: 1000 },
    { month: 'Nov', users: 1200 },
    { month: 'Dec', users: 1500 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2500 },
    { month: 'Jun', revenue: 3000 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 4000 },
    { month: 'Sep', revenue: 4500 },
    { month: 'Oct', revenue: 5000 },
    { month: 'Nov', revenue: 5500 },
    { month: 'Dec', revenue: 6000 },
  ];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Analytics Overview</h2>
      
      {/* User Growth Section */}
      <div className="mb-4 md:mb-6 bg-gradient-to-r from-green-200 via-green-300 to-green-400 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">User Growth Over Time</h3>
        <Chart
          title="User Growth"
          data={userGrowthData}
          xKey="month"
          yKey="users"
          chartType="line"
        />
      </div>
      
      {/* Revenue Trend Section */}
      <div className="mb-4 md:mb-6 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Revenue Trend</h3>
        <Chart
          title="Revenue Trend"
          data={revenueData}
          xKey="month"
          yKey="revenue"
          chartType="bar"
        />
      </div>

      {/* Engagement Metrics */}
      <div className="bg-gradient-to-r from-red-200 via-red-300 to-red-400 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700">Engagement Metrics</h3>
        <ul className="list-disc ml-4 text-gray-700">
          <li>Average Session Length: 10 mins</li>
          <li>Active Users: 75%</li>
          <li>New Signups This Month: 300</li>
          <li>Page Views: 12,000</li>
          <li>Bounce Rate: 25%</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
