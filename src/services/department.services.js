import { api } from './axios';

export const CreateDepartment = async (deptData) => {
	try {
		const res = await api.post('/department', deptData, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetAllDepartments = async () => {
	try {
		const res = await api.get('/department', {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const GetDepartmentById = async (deptId) => {
	try {
		const res = await api.post(`/department/${deptId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const UpdateDepartmentById = async (deptId, updates) => {
	try {
		const res = await api.put(`/department/${deptId}`, updates, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};

export const DeleteDepartmentById = async (deptId) => {
	try {
		const res = await api.delete(`/department/${scheduleId}`, {
			headers: {
				Authorization: localStorage.getItem('adminToken'),
			},
		});
		return res.data;
	} catch (error) {
		return { error };
	}
};
