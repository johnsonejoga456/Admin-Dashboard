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
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2500 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
      
      {/* User Growth Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
        <Chart
          title="User Growth"
          data={userGrowthData}
          xKey="month"
          yKey="users"
          chartType="line"
        />
      </div>
      
      {/* Revenue Trend Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <Chart
          title="Revenue Trend"
          data={revenueData}
          xKey="month"
          yKey="revenue"
          chartType="bar"
        />
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
        <ul className="list-disc ml-4">
          <li>Average Session Length: 10 mins</li>
          <li>Active Users: 75%</li>
          <li>New Signups This Month: 300</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
