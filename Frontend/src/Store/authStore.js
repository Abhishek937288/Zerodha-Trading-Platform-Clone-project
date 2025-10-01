import { create } from "zustand";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const userAuthstore = create((set) => ({
  user: null,
  setUser: (user) => {
    return set({ user });
  },

  // hey u connect or not

  // fetchFn: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const res = await axios.get(
  //       `${backendUrl}/api/auth/check-auth`,
  //       {
  //         withCredentials: true,
  //       },
  //       set({ isLoading: false, user: res.data })
  //     );
  //   } catch (err) {
  //     set({ error: err });
  //   }
  // },
}));
