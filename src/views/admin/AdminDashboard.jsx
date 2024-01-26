import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetAllSchedules } from '../../services/schedule.services';
import { ClipLoader } from 'react-spinners';
import Loader from '../../components/Loader/Loader';
import DashboardCard from '../../components/Card/DashboardCard';
import { LiaUserNurseSolid } from 'react-icons/lia';
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';

const AdminDashboard = () => {
	const [schedules, setSchedules] = useState([]);
	const [filteredSchedules, setFilteredSchedules] = useState([]);
	const [keyword, setKeyword] = useState('');

	const [loading, setLoading] = useState(false);

	const getAllSchedules = async () => {
		setLoading(true);

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

		setLoading(false);
	};

	const filterSchedules = () => {
		const filteredSchedules = schedules.filter((sc) =>
			sc.title.toLowerCase().includes(keyword.toLowerCase())
		);

		setFilteredSchedules(filteredSchedules);
	};

	useEffect(() => {
		filterSchedules();
	}, [keyword]);

	useEffect(() => {
		getAllSchedules();
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
				<DashboardCard
					title={'Nurses'}
					value={12}
					icon={<LiaUserNurseSolid size={25} />}
				/>
				<DashboardCard
					title={'Schedules'}
					value={23}
					icon={<BiCalendar size={25} />}
				/>
				<DashboardCard
					title={'Shifts'}
					value={9}
					icon={<AiOutlineSchedule size={25} />}
				/>
			</div>
			<div className="mt-6 border-2 p-8 rounded-md">
				{loading ? (
					<Loader />
				) : (
					<ScheduleCalendar
						setKeyword={setKeyword}
						events={
							filteredSchedules.length > 0 ? filteredSchedules : schedules
						}
						editable={false}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
