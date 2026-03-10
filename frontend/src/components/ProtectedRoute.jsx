import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // Wait for auth check to complete
  if (loading) return <div>Loading...</div>;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" />;

  // User is logged in, render children
  return children;
}