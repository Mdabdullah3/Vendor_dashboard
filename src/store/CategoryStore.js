import create from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

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

    addCategory: async (categoryData, navigate) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/categories`, categoryData);
            set((state) => ({
                categories: [...state.categories, response.data.data],
                loading: false,
            }));
            navigate("/admin/categories");
            toast.success('Category added successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },

    addSubCategory: async (subCategoryData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/sub-categories`, subCategoryData);
            set((state) => ({
                subCategories: [...state.subCategories, response.data.data],
                loading: false,
            }));
            toast.success('Sub Category added successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },

    updateCategory: async (categoryId, categoryData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/categories/${categoryId}`, categoryData);
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === categoryId ? response.data.data : category
                ),
                loading: false,
            }));

            toast.success('Category updated successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },

    updateSubCategory: async (subCategoryId, subCategoryData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/sub-categories/${subCategoryId}`, subCategoryData);
            set((state) => ({
                subCategories: state.subCategories.map((subCategory) =>
                    subCategory.id === subCategoryId ? response.data.data : subCategory
                ),
                loading: false,
            }));
            toast.success('Sub Category updated successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },

    deleteCategory: async (categoryId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/categories/${categoryId}`);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== categoryId),
                loading: false,
            }));
            toast.success('Category deleted successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },

    deleteSubCategory: async (subCategoryId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/sub-categories/${subCategoryId}`);
            set((state) => ({
                subCategories: state.subCategories.filter((subCategory) => subCategory.id !== subCategoryId),
                loading: false,
            }));
            toast.success('Sub Category deleted successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(error.message);
        }
    },
}));

export default useCategoryStore;
