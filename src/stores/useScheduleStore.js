import { create } from 'zustand';
import {
	CreateSchedule,
	DeleteScheduleById,
	GetAllSchedules,
	GetScheduleById,
	GetScheduleByNurseId,
	UpdateScheduleById,
} from '../services/schedule.services';

export const useScheduleStore = create((set) => ({
	allSchedules: [],
	scheduleData: {},
	scheduleByNurse: [],

	getLoading: false,
	createLoading: false,
	updateLoading: false,
	deleteLoading: false,

	getAllSchedules: async () => {
		set({ getLoading: true });
		const scheds = await GetAllSchedules();
		set({ allSchedules: scheds.data, getLoading: false });
	},

	getScheduleById: async (id) => {
		set({ getLoading: true });
		const sched = await GetScheduleById(id);
		set({ scheduleData: sched, getLoading: false });
	},

	getScheduleByNurse: async (id) => {
		set({ getLoading: true });
		const scheds = await GetScheduleByNurseId(id);
		set({ scheduleByNurse: scheds.data, getLoading: false });
	},

	createSchedule: async (data) => {
		set({ createLoading: true });
		const res = await CreateSchedule(data);
		set({ createLoading: false });

		return res;
	},

	updateSchedule: async (id, data) => {
		set({ updateLoading: true });
		const res = await UpdateScheduleById(id, data);
		set({ updateLoading: false });

		return res;
	},

	deleteSchedule: async (id) => {
		set({ deleteLoading: true });
		const res = await DeleteScheduleById(id);
		set({ deleteLoading: false });

		return res;
	},
}));
