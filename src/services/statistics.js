import { api } from './axios';

const adminHeaders = {
	Authorization: localStorage.getItem('adminToken'),
};

export const GetNurseCount = async () => {
	try {
		const res = await api.get(`/statistics/nurse`, { headers: adminHeaders });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetSchedulesCount = async () => {
	try {
		const res = await api.get(`/statistics/schedule`, {
			headers: adminHeaders,
		});
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetShiftCount = async () => {
	try {
		const res = await api.get(`/statistics/shift`, { headers: adminHeaders });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
