import { api } from './axios';

export const LoginAdmin = async (creds) => {
	try {
		const res = await api.post('/auth/admin/login', creds);
		return res;
	} catch (error) {
		return { error };
	}
};

export const LoginNurse = async (creds) => {
	try {
		const res = await api.post('/auth/nurse/login', creds);
		return res;
	} catch (error) {
		return { error };
	}
};

export const UpdateAdminPassword = async (creds) => {
	try {
		const res = await api.put('/auth/admin/update-password', creds, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res;
	} catch (error) {
		return { error };
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
		return { error };
	}
};
