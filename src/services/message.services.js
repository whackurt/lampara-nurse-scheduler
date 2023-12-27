import { api } from './axios';

const adminHeaders = {
	Authorization: localStorage.getItem('adminToken'),
};

const nurseHeaders = {
	Authorization: localStorage.getItem('nurseToken'),
};

export const GetMessages = async (chatId, user) => {
	try {
		const headers = user === 'admin' ? adminHeaders : nurseHeaders;

		const res = await api.get(`/message/chat/${chatId}/messages`, {
			headers,
		});

		return res;
	} catch (error) {
		return { error: error.message };
	}
};

export const SendMessage = async (messageData, user) => {
	try {
		const headers = user === 'admin' ? adminHeaders : nurseHeaders;

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
