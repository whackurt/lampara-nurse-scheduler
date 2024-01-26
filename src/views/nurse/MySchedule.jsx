import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NurseScheduleCalendar from '../../components/Calendar/NurseScheduleCalendar';
import { GetNurseById } from '../../services/nurse.services';
import { GetScheduleByNurseId } from '../../services/schedule.services';
import Loader from '../../components/Loader/Loader';

const MySchedule = () => {
	const [nurse, setNurse] = useState(null);
	const [mySchedule, setMySchedule] = useState([]);

	const [loading, setLoading] = useState(false);

	const getMySchedules = async () => {
		setLoading(true);

		const nurseId = localStorage.getItem('nurseId');
		const res = await GetScheduleByNurseId(nurseId);

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

		setLoading(false);
	};

	const getNurseDetails = async () => {
		const nurseId = localStorage.getItem('nurseId');

		const res = await GetNurseById(nurseId);

		if (res.success) {
			setNurse(res.data);
		}
	};

	useEffect(() => {
		getNurseDetails();
		getMySchedules();
	}, []);

	return (
		<div className="px-8 py-8">
			<HelmetProvider>
				<Helmet>
					<title>My Schedule - sked.io</title>
					<meta property="og:title" content="My Schedule - sked.io" />
				</Helmet>
			</HelmetProvider>

			<div className="flex flex-col">
				<h1 className="text-primary text-3xl font-bold">
					Hello, {nurse?.first_name}!
				</h1>
				<pc className="text-secondary text-xl">
					{moment().format('dddd, MMMM D, YYYY')}
				</pc>
			</div>
			<div className="mt-4 border-2 p-8 rounded-md">
				{loading ? <Loader /> : <NurseScheduleCalendar events={mySchedule} />}
			</div>
		</div>
	);
};

export default MySchedule;
