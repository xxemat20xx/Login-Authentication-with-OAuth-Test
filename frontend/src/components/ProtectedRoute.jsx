import { useAuthStore } from "../store/authStore"
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  
   if (isCheckingAuth) return <div>Loading...</div>;
   if (!isAuthenticated) return <Navigate to="/login" />

   return children;
}

export default ProtectedRoute