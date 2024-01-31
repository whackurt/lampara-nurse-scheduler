import { api } from './axios';

export const CreateShift = async (shiftData) => {
	try {
		const res = await api.post('/shift', shiftData, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllShifts = async () => {
	try {
		const res = await api.get(`/shift`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetShiftById = async (shiftId) => {
	try {
		const res = await api.get(`/shift/${shiftId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateShiftById = async (shiftId, updates) => {
	try {
		const res = await api.put(`/shift/${shiftId}`, updates, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteShiftById = async () => {
	try {
		const res = await api.delete(`/shift/${shiftId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
