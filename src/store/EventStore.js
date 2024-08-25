import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const useEventStore = create((set, get) => ({
    events: [],
    event: null,
    loading: false,
    error: null,

    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/events`);
            set({ events: response.data.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch events');
            set({ loading: false });
        }
    },

    fetchEventById: async (eventId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/events/${eventId}`);
            set({ event: response.data.data, loading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch event');
            set({ loading: false });
        }
    },

    createEvent: async (eventData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/events`, eventData);
            set({ loading: false });
            toast.success('Event created successfully!');
            get().fetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create event');
            set({ loading: false });
        }
    },

    updateEvent: async (eventId, eventData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/events/${eventId}`, eventData);
            set({ loading: false });
            toast.success('Event updated successfully!');
            get().fetchEvents(); // Refresh the events list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update event');
            set({ loading: false });
        }
    },

    deleteEvent: async (eventId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/events/${eventId}`);
            toast.success('Event deleted successfully!');
            get().fetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete event');
            set({ loading: false });
        }
    },
}));

export default useEventStore;
