import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const useReportStore = create((set, get) => ({
    reports: [],
    report: null,
    loading: false,
    error: null,

    fetchReports: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/reports?_limit=10000`);
            set({ reports: response?.data?.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch reports');
            set({ loading: false });
        }
    },

    fetchReportById: async (reportId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/reports/${reportId}`);
            set({ report: response?.data?.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch report');
            set({ loading: false });
        }
    },

    createReport: async (reportData) => {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_URL}/reports`, reportData);
            toast.success('Report created successfully!');
            get().fetchReports();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create report');
            set({ loading: false });
        }
    },

    updateReport: async (reportId, reportData) => {
        set({ loading: true, error: null });
        try {
            await axios.patch(`${API_URL}/reports/${reportId}`, reportData);
            toast.success('Report updated successfully!');
            get().fetchReports();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update report');
            set({ loading: false });
        }
    },

    deleteReport: async (reportId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/reports/${reportId}`);
            toast.success('Report deleted successfully!');
            get().fetchReports();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete report');
            set({ loading: false });
        }
    },
}));

export default useReportStore;
