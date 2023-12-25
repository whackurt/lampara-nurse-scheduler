import { api } from './axios';

const headers = {
	Authorization: localStorage.getItem('adminToken'),
};

export const CreateDepartment = async (deptData) => {
	try {
		const res = await api.post('/department', deptData, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetAllDepartments = async () => {
	try {
		const res = await api.get('/department', { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const GetDepartmentById = async (deptId) => {
	try {
		const res = await api.post(`/department/${deptId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const UpdateDepartmentById = async (deptId, updates) => {
	try {
		const res = await api.put(`/department/${deptId}`, updates, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};

export const DeleteDepartmentById = async (deptId) => {
	try {
		const res = await api.delete(`/department/${scheduleId}`, { headers });
		return res.data;
	} catch (error) {
		return { error: error.message };
	}
};
