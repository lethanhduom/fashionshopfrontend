import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('admin'); 

  if (!isLoggedIn) {
    
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminAuth;

{/* <Route path="/admin" element={
  <RequireAdminAuth>
    <Color />
  </RequireAdminAuth>
} /> */}
// localStorage.removeItem('adminToken');
// navigate('/admin/login');