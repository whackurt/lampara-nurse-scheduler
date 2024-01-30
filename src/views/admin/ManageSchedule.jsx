import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import moment from 'moment-timezone';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaButton from '../../components/Button/LamparaButton';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaDropdown from '../../components/Button/LamparaDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GetAllNurses } from '../../services/nurse.services';
import { GetAllShifts } from '../../services/shift.services';
import {
	CreateSchedule,
	GetAllSchedules,
	CheckIfScheduled,
} from '../../services/schedule.services';
import notify from '../../components/Notification/notify';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import Loader from '../../components/Loader/Loader';

const ManageSchedule = () => {
	const [showModal, setShowModal] = useState(false);
	const [newSchedule, setNewSchedule] = useState({});
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [nurses, setNurses] = useState([]);
	const [shifts, setShifts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const [dates, setDates] = useState([]);

	const [schedules, setSchedules] = useState([]);
	const [filteredSchedules, setFilteredSchedules] = useState([]);
	const [keyword, setKeyword] = useState('');

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const filterSchedules = () => {
		const filteredSchedules = schedules.filter(
			(sc) =>
				sc.title.toLowerCase().includes(keyword.toLowerCase()) ||
				sc.dept.toLowerCase().includes(keyword.toLowerCase())
		);

		setFilteredSchedules(filteredSchedules);
	};

	const createSchedule = async () => {
		setCreateLoading(true);

		if (Object.keys(newSchedule).length > 0) {
			let created = 0;
			let scheduledAlready = false;

			for (let i = 0; i < dates.length; i++) {
				const checkSched = await CheckIfScheduled(
					newSchedule.nurse_id,
					dates[i]
				);

				console.log(checkSched);

				if (!checkSched.success) {
					scheduledAlready = true;
					break;
				}

				newSchedule.date = `${dates[i]}`;

				const createSchedResponse = await CreateSchedule(newSchedule);

				if (createSchedResponse.success) {
					created += 1;
				}
			}

			if (created > 0) {
				notify('Schedule created successfully');
				setNewSchedule({});

				setStartDate(null);
				setEndDate(null);

				toggleModal();
				getAllSchedules();
			} else if (scheduledAlready) {
				notify('Nurse is scheduled already on the selected date(s).', true);
			} else {
				notify('Failed to create schedule. Please check the schedule.', true);
			}
		}

		setCreateLoading(false);
	};

	const onChange = (dates) => {
		const [start, end] = dates;

		setStartDate(start);
		setEndDate(end);

		let selectedDates = [];

		const _start = new Date(start);
		const _end = new Date(end);

		let loop = new Date(_start);

		while (loop.getTime() <= _end.getTime()) {
			const year = loop.getFullYear();
			const month = String(loop.getMonth() + 1).padStart(2, '0');
			const day = String(loop.getDate()).padStart(2, '0');

			const formattedDate = `${year}-${month}-${day}`;

			selectedDates.push(formattedDate);

			loop.setDate(loop.getDate() + 1);
		}

		if (selectedDates.length > 0) {
			setDates(selectedDates);
		}
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

	const getAllShifts = async () => {
		const res = await GetAllShifts();

		var restructured = res.data.map((shift) => {
			return {
				value: shift._id,
				label: `${moment(shift.start_time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format(
					'hh:mmA'
				)}-${moment(shift.end_time, 'YYYY-MM-DDThh:mm:ss.SSSZ').format(
					'hh:mmA'
				)}`,
			};
		});

		setShifts(restructured);
	};

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
					_id: sc._id,
					title: `${sc.nurse_id?.last_name}, ${sc.nurse_id?.first_name}`,
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

	useEffect(() => {
		filterSchedules();
		console.log('keyword:', keyword);
	}, [keyword]);

	useEffect(() => {
		getAllNurses();
		getAllShifts();
		getAllSchedules();
	}, []);

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>Manage Schedules - sked.io</title>
					<meta property="og:title" content="Manage Schedules - sked.io" />
				</Helmet>
			</HelmetProvider>

			<Toaster position="top-center" reverseOrder={true} />

			<CustomModal
				title={'Create Schedule'}
				toggleModal={toggleModal}
				showModal={showModal}
			>
				<p className="text-xs mb-3">
					<span className="text-red-500">*</span> Indicates required field
				</p>

				<LamparaDropdown
					label={'Nurse'}
					placeholder={'Select nurse'}
					options={nurses}
					onChange={(option) =>
						setNewSchedule({ ...newSchedule, nurse_id: option.value })
					}
				/>
				<LamparaDropdown
					label={'Shift'}
					placeholder={'Select Shift'}
					options={shifts}
					onChange={(option) =>
						setNewSchedule({ ...newSchedule, shift_id: option.value })
					}
				/>
				<p className="font-light text-xs">
					Date <span className="text-red-500">*</span>
				</p>

				<DatePicker
					dateFormat={'MMMM dd, yyyy'}
					className="text-sm px-2 py-1 border-2 rounded-md w-full"
					selected={startDate}
					onChange={onChange}
					startDate={startDate}
					minDate={new Date()}
					endDate={endDate}
					isClearable={true}
					selectsRange
				/>

				<LamparaButton
					loading={loading}
					loadingText={'Creating...'}
					onClick={createSchedule}
					label={'Create'}
				/>
			</CustomModal>
			<div className="p-8 rounded-md">
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="flex justify-end gap-x-2">
							<LamparaButton onClick={toggleModal} label={'Create Schedule'} />
						</div>
						<ScheduleCalendar
							shifts={shifts}
							nurses={nurses}
							setKeyword={setKeyword}
							getSchedules={getAllSchedules}
							events={keyword !== '' ? filteredSchedules : schedules}
							editable={true}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ManageSchedule;
