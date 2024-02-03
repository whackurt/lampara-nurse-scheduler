import { create } from 'zustand';

export const useMessageStore = create((set) => ({
	getMessages: async (chatId, userId, user) => {},
	sendMessage: async (data, user) => {},
}));
