import React from 'react';

const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex flex-col items-center ${color}`}>
      <div className="p-3 rounded-full bg-white bg-opacity-20 mb-2">
        {icon}
      </div>
      <p className="text-sm font-medium text-white mb-1">{title}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
};

export default Card;
