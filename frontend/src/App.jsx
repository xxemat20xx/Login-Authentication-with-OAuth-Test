import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;