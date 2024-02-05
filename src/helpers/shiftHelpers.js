import moment from 'moment';

export const shift = {
	'07:00 am': 'Day',
	'07:30 am': 'Day',
	'08:00 am': 'Day',
	'08:30 am': 'Day',
	'09:00 am': 'Day',
	'09:30 am': 'Day',
	'10:00 am': 'Day',
	'10:30 am': 'Day',
	'11:00 am': 'Day',
	'11:30 am': 'Day',
	'12:00 pm': 'Day',
	'12:30 pm': 'Day',
	'01:00 pm': 'Day',
	'01:30 pm': 'Day',
	'02:00 pm': 'Day',
	'02:30 pm': 'Day',
	'03:00 pm': 'Evening',
	'03:30 pm': 'Evening',
	'04:00 pm': 'Evening',
	'04:30 pm': 'Evening',
	'05:00 pm': 'Evening',
	'05:30 pm': 'Evening',
	'06:00 pm': 'Evening',
	'06:30 pm': 'Evening',
	'07:00 pm': 'Evening',
	'07:30 pm': 'Evening',
	'08:00 pm': 'Night',
	'08:30 pm': 'Night',
	'09:00 pm': 'Night',
	'09:30 pm': 'Night',
	'10:00 pm': 'Night',
	'10:30 pm': 'Night',
	'11:00 pm': 'Night',
	'11:30 pm': 'Night',
	'12:00 am': 'Night',
	'12:30 am': 'Night',
	'01:00 am': 'Night',
	'01:30 am': 'Night',
	'02:00 am': 'Night',
	'02:30 am': 'Night',
	'03:00 am': 'Day',
	'03:30 am': 'Day',
	'04:00 am': 'Day',
	'04:30 am': 'Day',
	'05:00 am': 'Day',
	'05:30 am': 'Day',
	'06:00 am': 'Day',
	'06:30 am': 'Day',
};

export const getShiftType = async (time) => {
	const formatted = moment(time).format('hh:mm a').toString();
	const type = shift[formatted];
	return type;
};

export const calculateHours = (startTime, endTime) => {
	var hours = moment(endTime).diff(moment(startTime), 'hours', true);

	if (parseInt(hours) < 0) {
		hours = hours + 24;
	}

	return parseFloat(hours.toFixed(1));
};

export const formatTime = (time) => {
	var formatted = moment(time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format('hh:mm A');
	return formatted;
};
