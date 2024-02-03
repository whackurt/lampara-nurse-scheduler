import { create } from 'zustand';
import {
	CreateShift,
	DeleteShiftById,
	GetAllShifts,
	GetShiftById,
	UpdateShiftById,
} from '../services/shift.services';

export const useShiftStore = create((set) => ({
	allShifts: [],
	shiftData: {},

	getLoading: false,
	createLoading: false,
	updateLoading: false,
	deleteLoading: false,

	getAllShifts: async () => {
		set({ getLoading: true });
		const shifts = await GetAllShifts();
		set({ allShifts: shifts.data, getLoading: false });
	},

	getShiftById: async (id) => {
		set({ getLoading: true });
		const shift = await GetShiftById(id);
		set({ shiftData: shift, getLoading: false });
	},

	createShift: async (data) => {
		set({ createLoading: true });
		const res = await CreateShift(data);
		set({ createLoading: false });

		return res;
	},

	updateShift: async (id, data) => {
		set({ updateLoading: true });
		const res = await UpdateShiftById(id, data);
		set({ updateLoading: false });

		return res;
	},

	deleteShift: async (id) => {
		set({ deleteLoading: true });
		const res = await DeleteShiftById(id);
		set({ deleteLoading: false });

		return res;
	},
}));
