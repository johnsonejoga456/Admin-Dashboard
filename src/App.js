// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Content from './pages/Content';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Campaigns from './pages/Campaigns';
import Settings from './pages/Settings';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="w-full ml-64">
      <Header />
      <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
      <Footer />
    </div>
  </div>
);

const App = () => (
  <AuthProvider>
    <NotificationProvider>
      <Router>
        <Notification />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Layout><Dashboard /></Layout>} />} />
          <Route path="/analytics" element={<ProtectedRoute element={<Layout><Analytics /></Layout>} />} />
          <Route path="/users" element={<ProtectedRoute element={<Layout><Users /></Layout>} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Layout><Orders /></Layout>} />} />
          <Route path="/content" element={<ProtectedRoute element={<Layout><Content /></Layout>} />} />
          <Route path="/products" element={<ProtectedRoute element={<Layout><Products /></Layout>} />} />
          <Route path="/campaigns" element={<ProtectedRoute element={<Layout><Campaigns /></Layout>} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Layout><Settings /></Layout>} />} />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
