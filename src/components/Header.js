import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600" aria-label="Settings">Settings</button>
                <button className="text-gray-600" aria-label="Profile">Profile</button>
            </div>
        </header>
    );
};

export default Header;