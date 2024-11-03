import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, ChartPieIcon, UsersIcon, DocumentTextIcon, 
  ShoppingBagIcon, ClipboardListIcon, BellIcon, CogIcon, LogoutIcon 
} from '@heroicons/react/outline';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-blue-200 text-white fixed top-0 left-0 shadow-lg">
            <h2 className="text-2xl font-bold p-6 border-b border-blue-300">Admin Dashboard</h2>
            <nav className="mt-10">
                <ul>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <HomeIcon className="h-5 w-5 mr-3" />
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <ChartPieIcon className="h-5 w-5 mr-3" />
                        <Link to="/analytics">Analytics</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <UsersIcon className="h-5 w-5 mr-3" />
                        <Link to="/users">Users</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <DocumentTextIcon className="h-5 w-5 mr-3" />
                        <Link to="/content">Content</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <ShoppingBagIcon className="h-5 w-5 mr-3" />
                        <Link to="/products">Products</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <ClipboardListIcon className="h-5 w-5 mr-3" />
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <BellIcon className="h-5 w-5 mr-3" />
                        <Link to="/campaigns">Campaigns</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <CogIcon className="h-5 w-5 mr-3" />
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li className="flex items-center p-4 hover:bg-blue-400 transition duration-200">
                        <LogoutIcon className="h-5 w-5 mr-3" />
                        <Link to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
