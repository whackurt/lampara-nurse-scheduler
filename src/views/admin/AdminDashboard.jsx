import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetAllSchedules } from '../../services/schedule.services';
import Loader from '../../components/Loader/Loader';
import { LiaUserNurseSolid } from 'react-icons/lia';
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';
import {
	GetNurseCount,
	GetSchedulesCount,
	GetShiftCount,
} from '../../services/statistics';
import StatisticsCard from '../../components/Card/StatisticsCard';
import { GetAllNurses } from '../../services/nurse.services';
import {
	restructureNurses,
	restructureSchedules,
} from '../../helpers/restructure';

const AdminDashboard = () => {
	const [schedules, setSchedules] = useState([]);
	const [filteredSchedules, setFilteredSchedules] = useState([]);
	const [nurses, setNurses] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);
	const [statisticLoading, setStatisticLoading] = useState(false);

	const [statistics, setStatistics] = useState({
		nurseCount: 0,
		shiftCount: 0,
		scheduleCount: 0,
	});

	const getAllSchedules = async () => {
		setLoading(true);

		const res = await GetAllSchedules();
		if (res.success) {
			const fetchedSchedules = res.data;
			var restructured = restructureSchedules(fetchedSchedules);

			setSchedules(restructured);
		} else {
			notify('Failed to fetch schedules.', true);
		}

		setLoading(false);
	};

	const filterSchedules = () => {
		const filteredSchedules = schedules.filter(
			(sc) =>
				sc.title.toLowerCase().includes(keyword.toLowerCase()) ||
				sc.dept.toLowerCase().includes(keyword.toLowerCase())
		);

		setFilteredSchedules(filteredSchedules);
	};

	const getStatistics = async () => {
		setStatisticLoading(true);

		var nurseCount = 0;
		var schedCount = 0;
		var shiftCount = 0;

		const nurse = await GetNurseCount();

		if (nurse.success) {
			nurseCount = nurse.count;
		}

		const schedule = await GetSchedulesCount();
		if (schedule.success) {
			schedCount = schedule.count;
		}

		const shift = await GetShiftCount();
		if (shift.success) {
			shiftCount = shift.count;
		}

		setStatistics({
			...statistics,
			nurseCount: nurseCount,
			shiftCount: shiftCount,
			scheduleCount: schedCount,
		});

		setStatisticLoading(false);
	};

	const getAllNurses = async () => {
		const res = await GetAllNurses();

		const fetchedNurses = res.data;
		var restructured = restructureNurses(fetchedNurses);

		setNurses(restructured);
	};

	useEffect(() => {
		filterSchedules();
	}, [keyword]);

	useEffect(() => {
		getAllSchedules();
		getAllNurses();
		getStatistics();
	}, []);


	return (
		<div className="px-8 py-8">
			<HelmetProvider>
				<Helmet>
					<title>Dashboard - sked.io</title>
					<meta property="og:title" content="Dashboard - sked.io" />
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
					loading={statisticLoading}
					title={'Nurses'}
					value={statistics.nurseCount}
					icon={<LiaUserNurseSolid size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					loading={statisticLoading}
					title={'Schedules'}
					value={statistics.scheduleCount}
					icon={<BiCalendar size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					loading={statisticLoading}
					title={'Shifts'}
					value={statistics.shiftCount}
					icon={<AiOutlineSchedule size={25} color="#0077B6" />}
				/>
			</div>
			<div className="mt-10 border p-8 rounded-md">
				{loading ? (
					<Loader />
				) : (
					<ScheduleCalendar
						// shifts={shifts}
						nurses={nurses}
						setKeyword={setKeyword}
						getSchedules={getAllSchedules}
						events={keyword !== '' ? filteredSchedules : schedules}
						editable={false}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
