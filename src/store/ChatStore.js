import { create } from "zustand";
import axios from "axios";

const useChatStore = create((set) => ({
    chats: [],
    selectedUser: null,

    fetchChats: async () => {
        try {
            const response = await axios.get('/api/reports', {
                params: { chatsOnly: true },
            });

            const chatsData = response.data;
            set({ chats: chatsData });
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),

    sendMessage: async (message) => {
        const { selectedUser } = useChatStore.getState();
        if (!selectedUser) return;

        const newMessage = {
            user: selectedUser._id,
            title: `Chat with ${selectedUser.name}`,
            message,
            description: '',
            image: '',
        };

        try {
            const response = await axios.post('/api/reports', newMessage, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const updatedChat = response.data;
            set((state) => ({
                chats: state.chats.map((chat) =>
                    chat.user._id === selectedUser._id ? updatedChat : chat
                ),
            }));
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    },
}));

export default useChatStore;
