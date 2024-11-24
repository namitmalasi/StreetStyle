import { create } from "zustand";
import useAuthStore from "./authStore.js";
const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  total: 0,

  fetchCart: async () => {
    const token = useAuthStore.getState().token;
    set({ loading: true });
    try {
      const response = await fetch("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      set({
        items: data,
        total: data.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    const token = useAuthStore.getState().token;
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      await get().fetchCart(); // Refresh cart after adding item
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateQuantity: async (productId, quantity) => {
    const token = useAuthStore.getState().token;
    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      await get().fetchCart(); // Refresh cart after updating
    } catch (error) {
      set({ error: error.message });
    }
  },

  clearCart: () => set({ items: [], total: 0 }),
}));

export default useCartStore;
