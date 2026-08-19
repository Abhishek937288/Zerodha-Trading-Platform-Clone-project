import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const useWatchlistStore = create((set, get) => ({
  stocksData: [],
  isLoading: true,
  searchInput: "",
  debouncedQuery: "",
  chartOpen: false,
  socketConnected: false,

  setSearchInput: (value) => set({ searchInput: value }),
  setDebouncedQuery: (value) => set({ debouncedQuery: value }),
  setChartOpen: (value) => set({ chartOpen: value }),

  closeAllForm: () =>
    set((state) => ({
      stocksData: state.stocksData.map((stock) => ({ ...stock, isOpen: false })),
    })),

  toggleForm: (id, shouldOpen = true) => {
    if (id === undefined) return;
    get().closeAllForm();
    set((s) => ({
      stocksData: s.stocksData.map((stock, i) =>
        i === id ? { ...stock, isOpen: shouldOpen } : stock
      ),
    }));
  },

  initSocket: () => {
    socket.on("connect", () => {
      set({ socketConnected: true });
    });

    socket.on("stocksData", (data) => {
      set({
        stocksData: data.map((s) => ({ ...s, isOpen: false })),
        isLoading: false,
      });
    });

    socket.on("disconnect", () => {
      set({ socketConnected: false });
    });
  },

  cleanupSocket: () => {
    socket.off("connect");
    socket.off("stocksData");
    socket.off("disconnect");
  },
}));
