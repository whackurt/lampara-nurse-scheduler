import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NurseScheduleCalendar from '../../components/Calendar/NurseScheduleCalendar';
import { GetNurseById } from '../../services/nurse.services';
import { GetScheduleByNurseId } from '../../services/schedule.services';
import Loader from '../../components/Loader/Loader';
import { restructureNurseSchedule } from '../../helpers/restructure';

const MySchedule = () => {
	const [nurse, setNurse] = useState(null);
	const [mySchedule, setMySchedule] = useState([]);

	const [loading, setLoading] = useState(false);

	const getMySchedules = async () => {
		setLoading(true);

		const nurseId = localStorage.getItem('nurseId');
		const res = await GetScheduleByNurseId(nurseId);

		if (res.success) {
			const fetchedSchedules = res.data;
			var restructured = restructureNurseSchedule(fetchedSchedules);

			setMySchedule(restructured);
		} else {
			notify('Failed to fetch schedules.', true);
		}

		setLoading(false);
	};

	const getNurseDetails = async () => {
		const nurseId = localStorage.getItem('nurseId');

		const res = await GetNurseById(nurseId);

		if (res.success) {
			setNurse(res.data);
		} else {
			notify('Failed to fetch nurse details.', true);
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
					Hello, {nurse?.first_name}&#x1F44B;
				</h1>
				<p className="text-xs">You can view your schedule below.</p>
				<p className="text-secondary text-xl mt-3">
					{moment().format('dddd, MMMM D, YYYY')}
				</p>
			</div>
			<div className="mt-4 border-2 p-8 rounded-md">
				{loading ? <Loader /> : <NurseScheduleCalendar events={mySchedule} />}
			</div>
		</div>
	);
};

export default MySchedule;
