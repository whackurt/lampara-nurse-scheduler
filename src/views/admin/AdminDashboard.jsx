import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../../components/Loader/Loader';
import { LiaUserNurseSolid } from 'react-icons/lia';
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';
import StatisticsCard from '../../components/Card/StatisticsCard';
import { restructureSchedules } from '../../helpers/restructure';
import { useStatisticStore } from '../../stores/useStatisticStore';
import { useScheduleStore } from '../../stores/useScheduleStore';

const AdminDashboard = () => {
	const getNurseCount = useStatisticStore((state) => state.getNurseCount);
	const getSchedCount = useStatisticStore((state) => state.getSchedCount);
	const getShiftCount = useStatisticStore((state) => state.getShiftCount);

	const nurseCount = useStatisticStore((state) => state.nurseCount);
	const schedCount = useStatisticStore((state) => state.schedCount);
	const shiftCount = useStatisticStore((state) => state.shiftCount);
	const statLoading = useStatisticStore((state) => state.isLoading);

	const getAllSchedules = useScheduleStore((state) => state.getAllSchedules);
	const getSchedLoading = useScheduleStore((state) => state.getLoading);
	const schedules = useScheduleStore((state) => state.allSchedules);
	const [restructuredSchedules, setRestructureSchedules] = useState([]);

	const _restructureSchedules = async () => {
		if (schedules) {
			var restructured = restructureSchedules(schedules);
			setRestructureSchedules(restructured);
		}
	};

	useEffect(() => {
		getAllSchedules();
		getNurseCount();
		getSchedCount();
		getShiftCount();
	}, []);

	useEffect(() => {
		_restructureSchedules();
	}, [schedules]);

	return (
		<div className="px-8 py-8">
			<HelmetProvider>
				<Helmet>
					<title>Dashboard - skedle</title>
					<meta property="og:title" content="Dashboard - skedle" />
				</Helmet>
			</HelmetProvider>
			<div className="flex flex-col">
				<h1 className="text-primary text-3xl font-bold">Good day&#x1F44B;</h1>
				<p className="text-secondary text-xl">
					{moment().format('dddd, MMMM D, YYYY')}
				</p>
			</div>
			<div className="flex mt-6 gap-x-3 ">
				<StatisticsCard
					loading={statLoading}
					title={'Nurses'}
					value={nurseCount}
					icon={<LiaUserNurseSolid size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					loading={statLoading}
					title={'Schedules'}
					value={schedCount}
					icon={<BiCalendar size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					loading={statLoading}
					title={'Shifts'}
					value={shiftCount}
					icon={<AiOutlineSchedule size={25} color="#0077B6" />}
				/>
			</div>
			<div className="mt-10 border p-8 rounded-md">
				{getSchedLoading ? (
					<Loader />
				) : (
					<ScheduleCalendar
						getSchedules={getAllSchedules}
						schedules={restructuredSchedules}
						editable={false}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
