import moment from 'moment';

export const restructureSchedules = (data) => {
	const restructured = data.map((sc) => {
		const formattedDate = moment(
			sc.date.substring(0, 10),
			'YYYY-MM-DDThh:mm:ss.SSSZ'
		).format('YYYY-MM-DD');

		return {
			_id: sc._id,
			title: `${sc.nurse_id?.last_name}, ${sc.nurse_id?.first_name}`,
			time: `${moment(
				sc.shift_id?.start_time,
				'YYYY-MM-DDThh:mm:ss.SSSZ'
			).format('hh:mmA')}-${moment(
				sc.shift_id?.end_time,
				'YYYY-MM-DDThh:mm:ss.SSSZ'
			).format('hh:mmA')}`,
			dept: sc.nurse_id?.department.name,
			date: formattedDate,
			backgroundColor: sc.nurse_id?.department.color,
		};
	});

	return restructured;
};

export const restructureNurseSchedule = (data) => {
	const restructured = data?.schedule.map((sc) => {
		return {
			title: `${moment(
				sc.shift_id?.start_time,
				'YYYY-MM-DDThh:mm:ss.SSSZ'
			).format('hh:mmA')} - ${moment(
				sc.shift_id?.end_time,
				'YYYY-MM-DDThh:mm:ss.SSSZ'
			).format('hh:mmA')}`,
			date: `${moment(sc.date).format('yyyy-MM-DD')}`,
			dept: data?.department.name,
		};
	});

	return restructured;
};

export const restructureShifts = (data) => {
	const restructured = data.map((shift) => {
		return {
			value: shift._id,
			label: `${moment(shift.start_time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format(
				'hh:mmA'
			)}-${moment(shift.end_time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format(
				'hh:mmA'
			)}`,
		};
	});

	return restructured;
};

export const restructureNurses = (data) => {
	var restructured = data.map((nurse) => {
		return {
			value: nurse._id,
			label: `${nurse.last_name}, ${nurse.first_name}`,
		};
	});

	return restructured;
};

export const restructureDepartments = (data) => {
	var restructured = data.map((dept) => {
		return { value: dept._id, label: dept.name };
	});

	return restructured;
};
