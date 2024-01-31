import { api } from './axios';

export const GetMessages = async (chatId, userId, user) => {
	try {
		const headers =
			user === 'admin'
				? {
						Authorization: localStorage.getItem('adminToken'),
				  }
				: {
						Authorization: localStorage.getItem('nurseToken'),
				  };

		const res = await api.get(
			`/message/chat/${chatId}/messages?userId=${userId}`,
			{
				headers,
			}
		);

		return res;
	} catch (error) {
		return { error: error.message };
	}
};

export const SendMessage = async (messageData, user) => {
	try {
		const headers =
			user === 'admin'
				? {
						Authorization: localStorage.getItem('adminToken'),
				  }
				: {
						Authorization: localStorage.getItem('nurseToken'),
				  };

		const res = await api.post(
			`/message/chat/${messageData.chatId}/send`,
			messageData,
			{ headers }
		);

		return res;
	} catch (error) {
		return { error: error.message };
	}
};
