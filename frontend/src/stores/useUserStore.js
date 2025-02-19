// frontend/src/stores/useUserStore.js
import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  checkingAuth: true,

  login: async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      set({ user: res.data });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Show the message returned by the rate limiter
        toast.error(
          error.response.data.message ||
            "Too many requests, please try again later."
        );
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  },

  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  register: async (fullName, email, password) => {
    try {
      const res = await axios.post("/api/auth/register", {
        fullName,
        email,
        password,
      });
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/api/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  fetchAlerts: async () => {
    try {
      const res = await axios.get("/api/alerts");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch alerts");
      return [];
    }
  },

  fetchMetrics: async () => {
    try {
      const res = await axios.get("/api/metrics");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch metrics");
      return {};
    }
  },
}));
