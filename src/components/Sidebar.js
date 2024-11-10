import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, ChartPieIcon, UsersIcon, DocumentTextIcon, 
  ShoppingBagIcon, ClipboardListIcon, ClipboardCheckIcon, BellIcon, 
  CogIcon, LogoutIcon, MenuIcon, XIcon 
} from '@heroicons/react/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Header with Toggle Button */}
      <div className="md:hidden bg-orange-400 p-4 flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Admin Dashboard</h2>
        <button onClick={toggleSidebar}>
          {isOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 lg:ml-45 lg:w-45 left-0 h-full w-56 bg-orange-400 text-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="hidden md:block text-2xl font-bold p-6 border-b border-orange-300">
          Admin Dashboard
        </h2>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <HomeIcon className="h-5 w-5 mr-2" />
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Dashboard</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <ChartPieIcon className="h-5 w-5 mr-2" />
              <Link to="/analytics" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Analytics</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <UsersIcon className="h-5 w-5 mr-2" />
              <Link to="/users" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Users</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              <Link to="/content" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Content</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              <Link to="/products" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Products</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <ClipboardListIcon className="h-5 w-5 mr-2" />
              <Link to="/orders" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Orders</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <ClipboardCheckIcon className="h-5 w-5 mr-2" />
              <Link to="/tasks" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Tasks</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <BellIcon className="h-5 w-5 mr-2" />
              <Link to="/campaigns" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Campaigns</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md">
              <CogIcon className="h-5 w-5 mr-2" />
              <Link to="/settings" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Settings</Link>
            </li>
            <li className="flex items-center px-3 py-2 hover:bg-orange-500 transition duration-200 rounded-md mt-auto">
              <LogoutIcon className="h-5 w-5 mr-2" />
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm lg:text-base">Logout</Link>
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
