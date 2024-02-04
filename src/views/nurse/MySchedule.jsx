import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NurseScheduleCalendar from '../../components/Calendar/NurseScheduleCalendar';
import Loader from '../../components/Loader/Loader';
import { restructureNurseSchedule } from '../../helpers/restructure';
import { useNurseStore } from '../../stores/useNurseStore';
import { useScheduleStore } from '../../stores/useScheduleStore';

const MySchedule = () => {
	const [mySchedule, setMySchedule] = useState([]);

	// Nurse
	const getNurseById = useNurseStore((state) => state.getNurseById);
	const nurseData = useNurseStore((state) => state.nurseData);

	// Schedule
	const getScheduleByNurse = useScheduleStore(
		(state) => state.getScheduleByNurse
	);
	const scheduleByNurse = useScheduleStore((state) => state.scheduleByNurse);
	const getLoading = useScheduleStore((state) => state.getLoading);

	const _restructureNurseSchedule = () => {
		var restructured = restructureNurseSchedule(scheduleByNurse);
		setMySchedule(restructured);
	};

	useEffect(() => {
		getScheduleByNurse(localStorage.getItem('nurseId'));
		getNurseById(localStorage.getItem('nurseId'));
	}, []);

	useEffect(() => {
		_restructureNurseSchedule();
	}, [scheduleByNurse]);

	return (
		<div className="px-8 py-8">
			<HelmetProvider>
				<Helmet>
					<title>My Schedule - skedle</title>
					<meta property="og:title" content="My Schedule - skedle" />
				</Helmet>
			</HelmetProvider>

			<div className="flex flex-col">
				<div className="flex justify-between">
					<h1 className="text-primary text-3xl font-bold">
						Hello, {nurseData?.first_name}&#x1F44B;
					</h1>
				</div>

				<p className="text-xs">You can view your schedule below.</p>
				<p className="text-secondary text-xl mt-3">
					{moment().format('dddd, MMMM D, YYYY')}
				</p>
			</div>
			<div className="mt-4 border-2 p-8 rounded-md">
				{getLoading ? (
					<Loader />
				) : (
					<NurseScheduleCalendar events={mySchedule} />
				)}
			</div>
		</div>
	);
};

export default MySchedule;
