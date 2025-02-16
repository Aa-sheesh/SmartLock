import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
// import { use } from "react";

export const useUserStore = create((set, get) => ({
  user: null,
  checkingAuth: true,

  login: async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occured");
    }
  },
  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occured");
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
      toast.error(error.response?.data?.message || "An error occured");
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
}));
