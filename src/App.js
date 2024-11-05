import React, { useContext } from 'react'; // Add useContext import
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Content from './pages/Content';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Notification from './components/Notification';
import Campaigns from './pages/Campaigns';
import Settings from './pages/Settings';

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
      <NotificationProvider>
        <Router>
          <Notification />
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<AuthenticatedLayout><ProtectedRoute><Dashboard /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/analytics" element={<AuthenticatedLayout><ProtectedRoute><Analytics /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/users" element={<AuthenticatedLayout><ProtectedRoute><Users /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/orders" element={<AuthenticatedLayout><ProtectedRoute><Orders /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/content" element={<AuthenticatedLayout><ProtectedRoute><Content /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/products" element={<AuthenticatedLayout><ProtectedRoute><Products /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/campaigns" element={<AuthenticatedLayout><ProtectedRoute><Campaigns /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="/settings" element={<AuthenticatedLayout><ProtectedRoute><Settings /></ProtectedRoute></AuthenticatedLayout>} />
            <Route path="*" element={<div>Page Not Found</div>} /> {/* Fallback route */}
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
