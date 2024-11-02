import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(credentials);
            if (data?.token) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/dashboard');
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                
                {/* Display error message if login fails */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    title="Enter your password"
                    required
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full p-2 rounded"
                    aria-label="Login"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
