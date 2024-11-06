import React, { useState } from "react";
import { register } from '../services/authService';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(userData);
            if (response.message === "Registration successful") {
                navigate('/login');
            } else {
                throw new Error(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <input
                    type="text"
                    name="name"
                    placeholder="Enter username"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
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

                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
