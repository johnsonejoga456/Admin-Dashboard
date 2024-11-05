import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-0 right-0 m-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md text-white ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' :
            notification.type === 'info' ? 'bg-blue-500' :
            'bg-gray-500'
          }`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
