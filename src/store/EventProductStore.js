import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';


const useEventProductStore = create((set, get) => ({
    eventProducts: [],
    eventProduct: null,
    loading: false,
    error: null,

    fetchEventProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/event-products`);
            set({ eventProducts: response.data.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch event products');
            set({ loading: false });
        }
    },

    fetchEventProductById: async (eventProductId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/event-products/${eventProductId}`);
            set({ eventProduct: response.data.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch event product');
            set({ loading: false });
        }
    },

    createEventProduct: async (eventProductData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/event-products`, eventProductData);
            set({ loading: false });
            toast.success('Event product created successfully!');
            get().fetchEventProducts(); // Refresh the event products list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create event product');
            set({ loading: false });
        }
    },

    updateEventProduct: async (eventProductId, eventProductData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/event-products/${eventProductId}`, eventProductData);
            set({ loading: false });
            toast.success('Event product updated successfully!');
            get().fetchEventProducts(); // Refresh the event products list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update event product');
            set({ loading: false });
        }
    },

    deleteEventProduct: async (eventProductId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/event-products/${eventProductId}`);
            toast.success('Event product deleted successfully!');
            get().fetchEventProducts(); // Refresh the event products list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete event product');
            set({ loading: false });
        }
    },
}));

export default useEventProductStore;
