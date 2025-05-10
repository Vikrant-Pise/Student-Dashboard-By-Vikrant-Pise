import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Dashboard />} />
              <Route path="courses" element={<ComingSoon title="Courses Management" />} />
              <Route path="settings" element={<ComingSoon title="Settings" />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
        
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFF',
              color: '#333',
            },
            success: {
              iconTheme: {
                primary: '#3B82F6',
                secondary: '#FFF',
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

// Simple placeholder for routes that are not implemented yet
const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-center py-20">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      This feature is coming soon. Stay tuned!
    </p>
  </div>
);

export default App;