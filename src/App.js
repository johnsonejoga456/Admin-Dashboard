import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/register" />;
};

const AuthenticatedLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="flex">
      <Sidebar />
      <div className={`w-full ${isAuthenticated ? 'ml-64' : ''}`}>
        <Header />
        <main className="p-4 bg-gray-100 min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Navigate to="/register" />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AuthenticatedLayout><ProtectedRoute><Dashboard /></ProtectedRoute></AuthenticatedLayout>} />
          <Route path="/analytics" element={<AuthenticatedLayout><ProtectedRoute><Analytics /></ProtectedRoute></AuthenticatedLayout>} />
          <Route path="/users" element={<AuthenticatedLayout><ProtectedRoute><Users /></ProtectedRoute></AuthenticatedLayout>} />
          <Route path="*" element={<div>Page Not Found</div>} /> {/* Fallback route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
