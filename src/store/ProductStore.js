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
    page: 1,
    limit: 10,
    searchTerm: '',
    sort: '-createdAt,price',

    fetchProducts: async () => {
        set({ loading: true });
        const { page, limit, searchTerm, sort } = useProductStore.getState();
        try {
            const response = await axios.get(`${API_URL}/products`, {
                params: {
                    _page: page,
                    _limit: limit,
                    _search: searchTerm ? `${searchTerm},name,slug,summary,description` : '',
                    _sort: sort,
                },
            });
            set({ products: response.data.data, totalProducts: response.data.total, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    setSort: (sort) => set({ sort }),

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
            toast.success("Product added successfully");
            console.log(response.data.data);
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
