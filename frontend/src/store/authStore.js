import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  register: async (data) => {
    const res = await api.post("/auth/register", data);
    set({ user: res.data });
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    set({ user: res.data });
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/auth/check"); // withCredentials sends the cookie
      set({
        user: res.data.user, // backend returns { user: { id, name, email } }
      });
    } catch (error) {
      console.error("checkAuth error:", error.response?.data || error.message);
      set({
        user: null,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
