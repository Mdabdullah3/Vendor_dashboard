import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../config";
import { toast } from "react-toastify";

const usePackageStore = create((set) => ({
    packages: [],
    packageProduts: [],
    singlePackage: null,
    loading: false,
    error: false,

    fetchPackages: async () => {
        set({ loading: true })
        try {
            const response = await axios.get(`${API_URL}/packages`, { withCredentials: true });
            set({ packages: response.data.data, loading: false })
        }
        catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
    fetchPackageProducts: async () => {
        set({ loading: true })
        try {
            const response = await axios.get(`${API_URL}/package-products`, { withCredentials: true });
            set({ packageProduts: response.data.data, loading: false })
        }
        catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
    fetchPackageById: async (id) => {
        set({ loading: true })
        try {
            const response = await axios.get(`${API_URL}/packages/${id}`, {
                withCredentials: true
            })
            set({ singlePackage: response.data.data, loading: false })
        }
        catch (error) {
            set({ error: error.response?.data.message || "An Error Occurred", loading: false })
        }
    },
    addPackages: async (formData) => {
        set({ loading: true })
        try {
            const response = await axios.post(`${API_URL}/packages`, formData, {
                withCredentials: true
            })
            toast.success(response.data.message || "Package Created Successfully")
        }
        catch (error) {
            set({ error: error.response?.data.message || "An Error Occurred", loading: false })
            toast.error(error?.response?.data.message)
        }
    },
    updatePackage: async (formData, id) => {
        set({ loading: true })
        try {
            const response = await axios.patch(`${API_URL}/packages/${id}`, formData, {
                withCredentials: true
            })
            toast.success(response.data.message)
        }
        catch (error) {
            set({ error: error.response?.data.message || "An Error Occurred", loading: false })
            toast.error(error.response.data.message)
        }
    },
    deletePackage: async (id) => {
        set({ loading: true })
        try {
            const response = await axios.delete(`${API_URL}/packages/${id}`, {
                withCredentials: true
            })
            toast.success(response.data.message)
        }
        catch (error) {
            set({ error: error.response?.data.message || "An Error Occurred", loading: false })
            toast.error(error.response.data.message)
        }
    }

}));

export default usePackageStore;