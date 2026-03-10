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
    console.log("Inside checkAuth"); // <- should appear
    set({ loading: true });
    try {
      const res = await api.get("/auth/check");
      console.log("checkAuth response:", res.data);
      set({ user: res.data });
    } catch (error) {
      console.error("checkAuth error:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
