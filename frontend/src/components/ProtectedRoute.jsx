import React from 'react';
import { Navigate,useLocation  } from 'react-router-dom';
import auth from '../services/auth';  // Assuming auth is where you handle user authentication

const ProtectedRoute = ({ children }) => {
  const currentUser = auth.getCurrentUser();
  const location = useLocation();  // To capture the current location

  if (!currentUser) {
    // If not authenticated, redirect to login page and pass the current location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
