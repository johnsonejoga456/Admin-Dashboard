import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService(credentials);
            if (data?.token) {
                login(data.token); // Set token in AuthContext
                navigate('/dashboard', { replace: true }); // Redirect to dashboard
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
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
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
                    value={credentials.password}
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

                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
