import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const RequireAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, token } = useAuth();
  if (token && !user) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default RequireAdmin;

