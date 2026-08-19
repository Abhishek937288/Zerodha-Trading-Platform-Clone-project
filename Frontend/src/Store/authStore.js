import { create } from "zustand";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthToken = () => localStorage.getItem("token");

export const userAuthstore = create((set) => ({
  user: null,
  isAuthLoading: true,

  setUser: (user) => {
    return set({ user });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  removeToken: () => {
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get(`${backendUrl}/api/auth/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: res.data.data, isAuthLoading: false });
    } catch (err) {
      set({ user: null, isAuthLoading: false });
    }
  },
}));
