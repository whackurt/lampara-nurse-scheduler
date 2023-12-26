import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet } from 'react-helmet';
import { GetAllSchedules } from '../../services/schedule.services';

const AdminDashboard = () => {
	const [schedules, setSchedules] = useState([]);

	const getAllSchedules = async () => {
		const res = await GetAllSchedules();

		if (res.success) {
			var restructured = res.data.map((sc) => {
				return {
					title: `${sc.nurse_id?.first_name} ${sc.nurse_id?.last_name}`,
					time: `${moment(
						sc.shift_id?.start_time,
						'YYYY-MM-DDThh:mm:ss.SSSZ'
					).format('hh:mmA')}-${moment(
						sc.shift_id?.end_time,
						'YYYY-MM-DDThh:mm:ss.SSSZ'
					).format('hh:mmA')}`,
					dept: sc.department?.name,
					date: `${moment(sc.date).format('yyyy-MM-DD')}`,
				};
			});

			setSchedules(restructured);
		}
	};

	useEffect(() => {
		getAllSchedules();
	}, []);

	return (
		<div>
			<Helmet>
				<title>Dashboard - Lampara</title>
				<meta property="og:title" content="Schedule-Nurses - Lampara" />
			</Helmet>
			<div className="flex flex-col">
				<h1 className="text-2xl font-semibold">Greetings!</h1>
				<p>{moment().format('dddd, MMMM D, YYYY')}</p>
			</div>
			<div className="lg:px-24 py-16">
				<ScheduleCalendar events={schedules} editable={false} />
			</div>
		</div>
	);
};

export default AdminDashboard;
