import { api } from './axios';

const headers = {
	Authorization: localStorage.getItem('adminToken'),
};

const nurseHeaders = {
	Authorization: localStorage.getItem('nurseToken'),
};

export const CreateNurse = async (nurseData) => {
	try {
		const res = await api.post(`/nurse`, nurseData, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllNurses = async () => {
	try {
		const res = await api.get('/nurse', { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetNurseById = async (nurseId) => {
	try {
		const res = await api.get(`/nurse/${nurseId}`, { headers: nurseHeaders });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateNurseById = async (nurseId, updates) => {
	try {
		const res = await api.put(`/nurse/${nurseId}`, updates, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteNurseById = async (nurseId) => {
	try {
		const res = await api.delete(`/nurse/${nurseId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
