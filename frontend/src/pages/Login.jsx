import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function Login() {

  const login = useAuthStore(state => state.login);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <a
          href="http://localhost:5000/api/auth/google"
          className="block text-center border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Continue with Google
        </a>

      </div>

    </div>
  );
}