import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetAllSchedules } from '../../services/schedule.services';
import { ClipLoader } from 'react-spinners';
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

const AdminDashboard = () => {
	const [schedules, setSchedules] = useState([]);
	const [filteredSchedules, setFilteredSchedules] = useState([]);
	const [nurses, setNurses] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);

	const [statistics, setStatistics] = useState({
		nurseCount: 0,
		shiftCount: 0,
		scheduleCount: 0,
	});

	const getAllSchedules = async () => {
		setLoading(true);

		const res = await GetAllSchedules();

		if (res.success) {
			var restructured = res.data.map((sc) => {
				const formattedDate = moment(
					sc.date.substring(0, 10),
					'YYYY-MM-DDThh:mm:ss.SSSZ'
				).format('YYYY-MM-DD');
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
					date: formattedDate,
					backgroundColor: sc.department?.color,
				};
			});

			setSchedules(restructured);
		}

		setLoading(false);
	};

	const filterSchedules = () => {
		const filteredSchedules = schedules.filter(
			(sc) =>
				sc.title.toLowerCase().includes(keyword.toLowerCase()) ||
				sc.dept.toLowerCase().includes(keyword.toLowerCase())
		);
		console.log(filteredSchedules);

		setFilteredSchedules(filteredSchedules);
	};

	const getStatistics = async () => {
		const nurse = await GetNurseCount();
		const nurseCount = nurse.count;

		const schedule = await GetSchedulesCount();
		const schedCount = schedule.count;

		const shift = await GetShiftCount();
		const shiftCount = shift.count;

		setStatistics({
			...statistics,
			nurseCount: nurseCount,
			shiftCount: shiftCount,
			scheduleCount: schedCount,
		});
	};

	const getAllNurses = async () => {
		const res = await GetAllNurses();

		var restructured = res.data.map((nurse) => {
			return {
				value: nurse._id,
				label: `${nurse.last_name}, ${nurse.first_name}`,
			};
		});

		restructured = [
			...restructured,
			{
				value: 'None',
				label: 'None',
			},
		];

		setNurses(restructured);
	};

	useEffect(() => {
		filterSchedules();
		console.log(keyword, nurses);
	}, [keyword]);

	useEffect(() => {
		getStatistics();
		getAllSchedules();
		getAllNurses();
	}, []);

	return (
		<div className="px-8 py-4">
			<HelmetProvider>
				<Helmet>
					<title>Dashboard - sked.io</title>
					<meta property="og:title" content="Dashboard - sked.io" />
				</Helmet>
			</HelmetProvider>
			<div className="flex flex-col">
				<h1 className="text-primary text-3xl font-bold">Good day!</h1>
				<p className="text-secondary text-xl">
					{moment().format('dddd, MMMM D, YYYY')}
				</p>
			</div>
			<div className="flex mt-6 gap-x-3">
				<StatisticsCard
					title={'Nurses'}
					value={statistics.nurseCount}
					icon={<LiaUserNurseSolid size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					title={'Schedules'}
					value={statistics.scheduleCount}
					icon={<BiCalendar size={25} color="#0077B6" />}
				/>
				<StatisticsCard
					title={'Shifts'}
					value={statistics.shiftCount}
					icon={<AiOutlineSchedule size={25} color="#0077B6" />}
				/>
			</div>
			<div className="mt-6 border-2 p-8 rounded-md">
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
