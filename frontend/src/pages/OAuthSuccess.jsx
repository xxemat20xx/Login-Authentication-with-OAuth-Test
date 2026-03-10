import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (loading) return; // wait for checkAuth to finish

    const timeout = setTimeout(() => {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 1500); // small delay for user experience

    return () => clearTimeout(timeout);
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Logging you in...</h2>
        <p className="text-sm text-gray-500 text-center">
          You are being redirected...
        </p>
      </div>
    </div>
  );
}