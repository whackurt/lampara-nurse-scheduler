import { create } from 'zustand';
import {
	CreateNurse,
	DeleteNurseById,
	GetAllNurses,
	GetNurseById,
	UpdateNurseById,
} from '../services/nurse.services';

export const useNurseStore = create((set) => ({
	allNurses: [], // all nurses
	nurseData: {}, // single nurse details

	getLoading: false,
	createLoading: false,
	updateLoading: false,
	deleteLoading: false,

	getError: null,
	createError: null,
	updateError: null,
	deleteError: null,

	getAllNurses: async () => {
		set({ getLoading: true });

		const res = await GetAllNurses();
		if (res.success) {
			const fetchedNurses = res.data;
			set({ allNurses: fetchedNurses });
		}

		set({ getLoading: false });
	},

	getNurseById: async (id) => {
		set({ getLoading: true });

		const res = await GetNurseById(id);
		if (res.success) {
			const fetchedNurse = res.data;
			set({ nurseData: fetchedNurse });
		}

		set({ getLoading: false });
	},

	createNurse: async (data) => {
		set({ createLoading: true });

		const res = await CreateNurse(data);
		set({ createLoading: false });

		return res;
	},

	updateNurseById: async (id, data) => {
		set({ updateLoading: true });
		const res = await UpdateNurseById(id, data);
		set({ updateLoading: false });

		return res;
	},

	deleteNurseById: async (id) => {
		set({ deleteLoading: true });
		const res = await DeleteNurseById(id);
		set({ deleteLoading: false });

		return res;
	},
}));
