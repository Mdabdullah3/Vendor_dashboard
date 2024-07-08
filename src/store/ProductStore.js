import create from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
const useProductStore = create((set) => ({
    products: [],
    product: null,
    totalProducts: 0,
    loading: false,
    error: null,

    fetchProducts: async (query) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/products`, { params: query });
            set({ products: response.data.data, totalProducts: response.data.total, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    fetchProductByIdOrSlug: async (idOrSlug) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/products/${idOrSlug}`);
            set({ product: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    addProduct: async (productData) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${API_URL}/products`, productData, {
            withCredentials: true,
          });
          toast.success(response.data.message);
          set((state) => ({
            products: [...state.products, response.data.data],
            loading: false,
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
        }
      },
      

    updateProduct: async (idOrSlug, productData) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`${API_URL}/products/${idOrSlug}`, productData);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === idOrSlug || product.slug === idOrSlug ? response.data.data : product),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    deleteProduct: async (idOrSlug) => {
        set({ loading: true });
        try {
            await axios.delete(`${API_URL}/products/${idOrSlug}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== idOrSlug && product.slug !== idOrSlug),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },
}));

export default useProductStore;