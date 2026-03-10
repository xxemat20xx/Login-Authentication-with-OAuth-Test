import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="text-lg font-semibold text-gray-700">
          Logging you in...
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Please wait while we complete your authentication.
        </p>

      </div>

    </div>
  );
}