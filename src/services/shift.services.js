import { api } from './axios';

const headers = {
	Authorization: localStorage.getItem('adminToken'),
};

export const CreateShift = async (shiftData) => {
	try {
		const res = await api.post('/shift', shiftData, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllShifts = async () => {
	try {
		const res = await api.get(`/shift`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetShiftById = async (shiftId) => {
	try {
		const res = await api.get(`/shift/${shiftId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateShiftById = async (shiftId, updates) => {
	try {
		const res = await api.put(`/shift/${shiftId}`, updates, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteShiftById = async () => {
	try {
		const res = await api.delete(`/shift/${shiftId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
