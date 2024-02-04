import { api } from './axios';

export const GetNurseCount = async () => {
	try {
		const res = await api.get(`/statistics/nurse`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetSchedulesCount = async () => {
	try {
		const res = await api.get(`/statistics/schedule`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetShiftCount = async () => {
	try {
		const res = await api.get(`/statistics/shift`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
