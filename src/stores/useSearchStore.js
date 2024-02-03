import { create } from 'zustand';
import { filterSchedules } from '../helpers/filter';

export const useSearchStore = create((set) => ({
	keyword: ' ',
	filteredSchedules: [],
	filterMode: '',

	setFilterMode: (filter) => {
		set({ filterMode: filter });
	},

	setKeyword: (keyword) => {
		set({ keyword: keyword });
	},

	execFilter: (data, keyword) => {
		const filtered = filterSchedules(data, keyword);
		set({ filteredSchedules: filtered });
	},
}));
