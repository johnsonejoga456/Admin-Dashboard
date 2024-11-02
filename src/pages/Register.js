import React, { useState } from "react";
import { register } from '../services/authService';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
            navigate('/login');
        } catch (error) {
            console.error('registration failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter username"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your password"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full p-2 rounded"
                    aria-label="Register"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
