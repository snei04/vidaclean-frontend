// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige a la página de login
    return <Navigate to="/admin/login" />;
  }

  return children; // Si hay token, muestra el componente solicitado
}

export default ProtectedRoute;