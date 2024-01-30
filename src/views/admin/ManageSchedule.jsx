import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../components/Calendar/ScheduleCalendar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaButton from '../../components/Button/LamparaButton';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaDropdown from '../../components/Button/LamparaDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GetAllNurses } from '../../services/nurse.services';
import { GetAllShifts } from '../../services/shift.services';
import notify from '../../components/Notification/notify';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import {
	CreateSchedule,
	GetAllSchedules,
	CheckIfScheduled,
} from '../../services/schedule.services';
import {
	restructureNurses,
	restructureSchedules,
	restructureShifts,
} from '../../helpers/restructure';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import { IoCreateOutline } from 'react-icons/io5';
import { MdEditCalendar } from 'react-icons/md';

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
		const fetchedNurses = res.data;
		var restructured = restructureNurses(fetchedNurses);

		setNurses(restructured);
	};

	const getAllShifts = async () => {
		const res = await GetAllShifts();
		const fetchedShifts = res.data;
		var restructured = restructureShifts(fetchedShifts);

		setShifts(restructured);
	};

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

	useEffect(() => {
		filterSchedules();
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

				<LamparaTextButtonWithIcon
					loading={loading}
					loadingText={'Saving schedule...'}
					icon={<MdEditCalendar size={25} color="#FFFFFF" />}
					bgColor="bg-green-600"
					onClick={createSchedule}
					label={'Save New Schedule'}
				/>
			</CustomModal>
			<div className="p-8 rounded-md">
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="flex justify-end gap-x-2">
							<LamparaTextButtonWithIcon
								icon={<MdEditCalendar size={25} color="#FFFFFF" />}
								onClick={toggleModal}
								bgColor="bg-green-600"
								label={'Create Schedule'}
							/>
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
