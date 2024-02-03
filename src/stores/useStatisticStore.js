import { create } from 'zustand';
import {
	GetNurseCount,
	GetSchedulesCount,
	GetShiftCount,
} from '../services/statistics';

export const useStatisticStore = create((set) => ({
	nurseCount: 0,
	schedCount: 0,
	shiftCount: 0,
	isLoading: false,

	getNurseCount: async () => {
		set({ isLoading: true });
		const res = await GetNurseCount();
		set({ nurseCount: res.count, isLoading: false });
	},

	getSchedCount: async () => {
		set({ isLoading: true });
		const res = await GetSchedulesCount();
		set({ schedCount: res.count, isLoading: false });
	},

	getShiftCount: async () => {
		set({ isLoading: true });
		const res = await GetShiftCount();
		set({ shiftCount: res.count, isLoading: false });
	},
}));
