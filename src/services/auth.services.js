import { api } from './axios';

const headers = {
	Authorization: localStorage.getItem('adminToken'),
};

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

export const UpdateAdminPassword = async (creds) => {
	try {
		const res = await api.put('/auth/admin/update-password', creds, {
			headers,
		});
		return res;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateNursePassword = async (creds) => {
	try {
		const res = await api.put('/auth/nurse/update-password', creds, {
			headers: {
				Authorization: localStorage.getItem('nurseToken'),
			},
		});
		return res;
	} catch (error) {
		return { error: error.message };
	}
};
