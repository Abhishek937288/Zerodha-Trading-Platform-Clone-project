import { create } from "zustand";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const userAuthstore = create((set) => ({
  user: null,
  isAuthLoading: true,

  setUser: (user) => {
    return set({ user });
  },

  checkAuth: async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/auth/check-auth`,
        { withCredentials: true }
      );
      set({ user: res.data.data, isAuthLoading: false });
    } catch (err) {
      set({ user: null, isAuthLoading: false });
    }
  },
}));
