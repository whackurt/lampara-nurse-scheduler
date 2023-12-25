import { api } from './axios';

const headers = {
	Authorization: localStorage.getItem('adminToken'),
};

export const CreateSchedule = async (scheduleData) => {
	try {
		const res = await api.post('/schedule', scheduleData, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllSchedules = async () => {
	try {
		const res = await api.get(`/schedule`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetScheduleById = async (scheduleId) => {
	try {
		const res = await api.get(`/schedule/${scheduleId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetScheduleByNurseId = async (nurseId) => {
	try {
		const res = await api.get(`/schedule/${nurseId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateScheduleById = async (scheduleId, updates) => {
	try {
		const res = await api.put(`/schedule/${scheduleId}`, updates, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteScheduleById = async (scheduleId) => {
	try {
		const res = await api.delete(`/schedule/${scheduleId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
