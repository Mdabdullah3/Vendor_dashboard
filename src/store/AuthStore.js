import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    users: [],
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

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            set({ user: null, loading: false });
            toast.success('Logout successful');
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
                set({ user: response.data.data, loading: false });
                localStorage.setItem('user', JSON.stringify(response.data.data));
            } else {
                toast.error('Login failed. Please try again.');
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            set({ loading: false });
        }
    },
    updateUser: async (userData, navigate) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/users/me`, userData, {
                withCredentials: true,
            });
            toast.success("Profile Update Successfully")
            navigate('/admin');
            set({ user: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    updateSingleUser: async (userData, id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/users/${id}`, userData, {
                withCredentials: true,
            });
            set((state) => ({
                users: state.users.map(user =>
                    user._id === id ? { ...user, ...response.data.data } : user
                ),
                loading: false
            }));
            console.log(response);
            toast.success('Updated successfully!');
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    updatePassword: async (currentPassword, password, confirmPassword) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(
                `${API_URL}/auth/update-password`,
                { currentPassword, password, confirmPassword },
                {
                    withCredentials: true,
                }
            );
            toast.success("Password Set Successfully, Please Login First!");
            set({ user: response.data.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message);
            set({ error: error.message, loading: false });
        }
    },
    fetchAdminUser: async () => {
        set({ loading: true, error: null, });
        try {
            const response = await axios.get(`${API_URL}/users?_filter[role]=admin`, {
                withCredentials: true
            });
            set({
                users: response.data.data,
            });
        } catch (error) {
            set({ error: error.message, loading: false });

        }
    },
}));

export default useUserStore;
