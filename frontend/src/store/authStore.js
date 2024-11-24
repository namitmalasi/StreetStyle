import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  login: async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      set({ user: data.user });
      localStorage.setItem("token", data.token);
      set({ token: data.token });
      return data;
    } catch (error) {
      throw error;
    }
  },
  signup: async (name, email, password) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signup failed");

    set({ user: data.user, token: data.token });
    localStorage.setItem("token", data.token);
    return data;
  },
}));

export default useAuthStore;
