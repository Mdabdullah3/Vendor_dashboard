import create from "zustand";
import axios from "axios";
import { API_URL } from "../config";

const useVoucherStore = create((set) => ({
    vouchers: [],
    voucher: null,
    loading: false,
    error: null,

    fetchVouchers: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/vouchers`, { withCredentials: true });
            set({ vouchers: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
    fetchVoucherById: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${API_URL}/vouchers/${id}`, { withCredentials: true });
            set({ voucher: response.data.data, loading: false });

        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
            return null;
        }
    },

    addVoucher: async (voucher) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${API_URL}/vouchers`, voucher, { withCredentials: true });
            set((state) => ({
                vouchers: [...state.vouchers, response.data.data],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },

    deleteVoucher: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${API_URL}/vouchers/${id}`, { withCredentials: true });
            set((state) => ({
                vouchers: state.vouchers.filter((voucher) => voucher._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },



    updateVoucher: async (id, updatedVoucher) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`${API_URL}/vouchers/${id}`, updatedVoucher, { withCredentials: true });
            set((state) => ({
                vouchers: state.vouchers.map((voucher) =>
                    voucher._id === id ? response.data.data : voucher
                ),
                loading: false,
                selectedVoucher: null,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "An error occurred", loading: false });
        }
    },
}));

export default useVoucherStore;
