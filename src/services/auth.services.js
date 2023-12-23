import { api } from './axios';

export const LoginAdmin = async (creds) => {
	try {
		const res = await api.post('/auth/admin/login', creds);
		return res;
	} catch (error) {
		return { error: error.message };
	}
};

export const LoginNurse = async (creds) => {
	try {
		const res = await api.post('/auth/nurse/login', creds);
		return res;
	} catch (error) {
		return { error: error.message };
	}
};
