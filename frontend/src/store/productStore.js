import { create } from "zustand";
const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
