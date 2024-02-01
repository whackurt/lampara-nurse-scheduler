export const filterSchedules = (data, keyword) => {
	const filteredSchedules = data.filter(
		(sc) =>
			String(sc.title).toLowerCase().includes(keyword.toLowerCase()) ||
			String(sc.dept).toLowerCase().includes(keyword.toLowerCase())
	);

	return filteredSchedules;
};
