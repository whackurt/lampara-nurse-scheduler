import { api } from './axios';

export const CreateNurse = async (nurseData) => {
	try {
		const res = await api.post(`/nurse`, nurseData, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllNurses = async () => {
	try {
		const res = await api.get('/nurse', {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetNurseById = async (nurseId) => {
	try {
		const res = await api.get(`/nurse/${nurseId}`, {
			headers: {
				Authorization: localStorage.getItem('nurseToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateNurseById = async (nurseId, updates) => {
	try {
		const res = await api.put(`/nurse/${nurseId}`, updates, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteNurseById = async (nurseId) => {
	try {
		const res = await api.delete(`/nurse/${nurseId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
