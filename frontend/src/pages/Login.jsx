import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // redirect handled by ProtectedRoute
    } catch (errMsg) {
      setError(errMsg);
    }
  };

  const handleGoogleLogin = () => {
    // redirects to backend Google OAuth
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleGoogleLogin}
        style={{ width: "100%", padding: "10px", backgroundColor: "#4285F4", color: "#fff", border: "none" }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;