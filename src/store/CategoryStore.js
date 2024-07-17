import create from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
const useCategoryStore = create((set) => ({
    categories: [],
    subCategories: [],
    category: null,
    subCategory: null,
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/categories`);
            set({ categories: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchSubCategories: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/sub-categories`);
            set({ subCategories: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchCategoryById: async (categoryId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/categories/${categoryId}`);
            set({ category: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchSubCategoryById: async (subCategoryId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/sub-categories/${subCategoryId}`);
            set({ subCategory: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

}));

export default useCategoryStore;
