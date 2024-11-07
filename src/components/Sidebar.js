import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, ChartPieIcon, UsersIcon, DocumentTextIcon, 
  ShoppingBagIcon, ClipboardListIcon, BellIcon, CogIcon, LogoutIcon, MenuIcon, XIcon 
} from '@heroicons/react/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Mobile Header with Toggle Button */}
      <div className="md:hidden bg-orange-400 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <button onClick={toggleSidebar}>
          {isOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-orange-400 text-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="hidden md:block text-2xl font-bold p-6 border-b border-orange-300">Admin Dashboard</h2>
        <nav className="mt-10">
          <ul>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <HomeIcon className="h-5 w-5 mr-3" />
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <ChartPieIcon className="h-5 w-5 mr-3" />
              <Link to="/analytics" onClick={() => setIsOpen(false)}>Analytics</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <UsersIcon className="h-5 w-5 mr-3" />
              <Link to="/users" onClick={() => setIsOpen(false)}>Users</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              <Link to="/content" onClick={() => setIsOpen(false)}>Content</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <ShoppingBagIcon className="h-5 w-5 mr-3" />
              <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <ClipboardListIcon className="h-5 w-5 mr-3" />
              <Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <BellIcon className="h-5 w-5 mr-3" />
              <Link to="/campaigns" onClick={() => setIsOpen(false)}>Campaigns</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <CogIcon className="h-5 w-5 mr-3" />
              <Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link>
            </li>
            <li className="flex items-center p-4 hover:bg-orange-200 transition duration-200">
              <LogoutIcon className="h-5 w-5 mr-3" />
              <Link to="/login" onClick={() => setIsOpen(false)}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
