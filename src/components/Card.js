import React from 'react';

const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex items-center ${color}`}>
      <div className="p-3 rounded-full bg-white bg-opacity-20">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default Card;