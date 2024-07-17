import create from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,

    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
            set({ user: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/users/me`, userData, {
                withCredentials: true,
            });
            set({ user: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            set({ user: null, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    login: async (email, password, router) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
            if (response.status === 200) {
                await get().fetchUser();
                toast.success('Login successful');
                router('/admin');
                console.log(response)
            } else {
                toast.error('Login failed. Please try again.');
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            set({ loading: false });
        }
    },

}));

export default useUserStore;
