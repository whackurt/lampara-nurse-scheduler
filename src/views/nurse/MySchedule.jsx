import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NurseScheduleCalendar from '../../components/Calendar/NurseScheduleCalendar';
import { GetNurseById } from '../../services/nurse.services';
import { GetScheduleByNurseId } from '../../services/schedule.services';

const MySchedule = () => {
	const [nurse, setNurse] = useState(null);
	const [mySchedule, setMySchedule] = useState([]);

	const getMySchedules = async () => {
		const res = await GetScheduleByNurseId(localStorage.getItem('nurseId'));

		if (res.success) {
			var restructured = res.data?.schedule.map((sc) => {
				return {
					title: `${moment(
						sc.shift_id?.start_time,
						'YYYY-MM-DDThh:mm:ss.SSSZ'
					).format('hh:mmA')} - ${moment(
						sc.shift_id?.end_time,
						'YYYY-MM-DDThh:mm:ss.SSSZ'
					).format('hh:mmA')}`,
					date: `${moment(sc.date).format('yyyy-MM-DD')}`,
					dept: res.data?.department.name,
				};
			});
			setMySchedule(restructured);
		}
	};

	const getNurseDetails = async () => {
		const res = await GetNurseById(localStorage.getItem('nurseId'));

		if (res.success) {
			setNurse(res.data);
		}
	};

	useEffect(() => {
		getNurseDetails();
		getMySchedules();
	}, []);

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>My Schedule - Lampara</title>
					<meta property="og:title" content="Schedule-Nurses - Lampara" />
				</Helmet>
			</HelmetProvider>

			<div className="flex flex-col">
				<h1 className="text-2xl font-semibold">Hello, {nurse?.first_name}!</h1>
				<p>{moment().format('dddd, MMMM D, YYYY')}</p>
			</div>
			<div className="lg:px-24 py-16">
				<NurseScheduleCalendar events={mySchedule} />
			</div>
		</div>
	);
};

export default MySchedule;
