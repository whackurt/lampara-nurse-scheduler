import { api } from './axios';

export const CreateSchedule = async (scheduleData) => {
	try {
		const res = await api.post('/schedule', scheduleData, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const CheckIfScheduled = async (nurseId, date) => {
	try {
		const res = await api.post(
			`/schedule/checkSchedule?nurseId=${nurseId}&date=${date}`,
			{
				headers: {
					Authorization: localStorage.getItem('adminToken'),
				},
			}
		);

		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetAllSchedules = async () => {
	try {
		const res = await api.get(`/schedule`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetScheduleById = async (scheduleId) => {
	try {
		const res = await api.get(`/schedule/${scheduleId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetScheduleByNurseId = async (nurseId) => {
	try {
		const res = await api.get(`/schedule/nurse/${nurseId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const UpdateScheduleById = async (scheduleId, updates) => {
	try {
		const res = await api.put(`/schedule/${scheduleId}`, updates, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const DeleteScheduleById = async (scheduleId) => {
	try {
		const res = await api.delete(`/schedule/${scheduleId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};
