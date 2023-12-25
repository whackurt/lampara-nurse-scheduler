import moment from 'moment';
import React from 'react';
import ScheduleCalendar from '../../../components/Calendar/ScheduleCalendar';
import { Helmet } from 'react-helmet';
import NurseScheduleCalendar from '../../../components/Calendar/NurseScheduleCalendar';

const MySchedule = () => {
	const events = [
		{
			title: '01:00pm - 09:00pm',
			dept: 'ER',
			date: '2023-12-06',
		},
		{
			title: '01:00pm - 09:00pm',
			dept: 'ER',
			date: '2023-12-07',
		},
		{
			title: '01:00pm - 09:00pm',
			dept: 'ER',
			date: '2023-12-13',
		},
		{
			title: '01:00pm - 09:00pm',
			dept: 'ER',
			date: '2023-12-15',
		},
	];
	return (
		<div>
			<Helmet>
				<title>My Schedule - Lampara</title>
				<meta property="og:title" content="Schedule-Nurses - Lampara" />
			</Helmet>

			<div className="flex flex-col">
				<h1 className="text-2xl font-semibold">Hello, Kurt!</h1>
				<p>{moment().format('dddd, MMMM D, YYYY')}</p>
			</div>
			<div className="lg:px-24 py-16">
				<NurseScheduleCalendar events={events} />
			</div>
		</div>
	);
};

export default MySchedule;
