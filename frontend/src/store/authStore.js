import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isLoading: false,
  isAuthenticated: false,

  // register
  register: async (data) => {
    try {
      set({ isLoading: true });

      await api.post("/auth/register", data);

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error.response?.data?.message || "Register failed";
    }
  },

  // login
  login: async (data) => {
    try {
      set({ isLoading: true });

      const res = await api.post("/auth/login", data);

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        isAuthenticated: false,
      });
      throw error.response?.data?.message || "Login failed";
    }
  },

  // logout
  logout: async () => {
    try {
      await api.post("/auth/logout");

      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error(error);
    }
  },

  // check authentication
  checkAuth: async () => {
    try {
      const res = await api.get("/auth/checkAuth");

      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));
