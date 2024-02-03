import { create } from 'zustand';
import {
	CreateDepartment,
	DeleteDepartmentById,
	GetAllDepartments,
	GetDepartmentById,
	UpdateDepartmentById,
} from '../services/department.services';

export const useDepartmentStore = create((set) => ({
	allDepartments: [],
	departmentData: {},

	getLoading: false,
	createLoading: false,
	updateLoading: false,
	deleteLoading: false,

	getAllDepartments: async () => {
		set({ getLoading: true });
		const depts = await GetAllDepartments();
		set({ allDepartments: depts.data, getLoading: false });
	},

	getDepartmentById: async (id) => {
		set({ getLoading: true });
		const dept = await GetDepartmentById(id);
		set({ departmentData: dept, getLoading: false });
	},

	createDepartment: async (data) => {
		set({ createLoading: true });
		const res = await CreateDepartment(data);
		set({ createLoading: false });

		return res;
	},

	updateDepartment: async (id, data) => {
		set({ updateLoading: true });
		const res = await UpdateDepartmentById(id, data);
		set({ updateLoading: false });

		return res;
	},

	deleteDepartment: async (id) => {
		set({ deleteLoading: true });
		const res = await DeleteDepartmentById(id);
		set({ deleteLoading: false });

		return res;
	},
}));
