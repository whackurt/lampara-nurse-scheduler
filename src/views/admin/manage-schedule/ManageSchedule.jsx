import React, { useEffect, useState } from 'react';
import ScheduleCalendar from '../../../components/Calendar/ScheduleCalendar';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import LamparaButton from '../../../components/Button/LamparaButton';
import CustomModal from '../../../components/Modal/CustomModal';
import LamparaDropdown from '../../../components/Button/LamparaDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GetAllNurses } from '../../../services/nurse.services';
import { GetAllShifts } from '../../../services/shift.services';
import {
	CreateSchedule,
	GetAllSchedules,
} from '../../../services/schedule.services';

const ManageSchedule = () => {
	const [showModal, setShowModal] = useState(false);
	const [newSchedule, setNewSchedule] = useState({});
	const [startDate, setStartDate] = useState(new Date());
	const [nurses, setNurses] = useState([]);
	const [shifts, setShifts] = useState([]);
	const [schedules, setSchedules] = useState([]);
	const [loading, setLoading] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const createSchedule = async () => {
		setLoading(true);

		const res = await CreateSchedule(newSchedule);

		if (res.success) {
			toggleModal();
			getAllSchedules();
		}

		setLoading(false);
	};

	const getAllNurses = async () => {
		const res = await GetAllNurses();

		var restructured = res.data.map((nurse) => {
			return {
				value: nurse._id,
				label: `${nurse.first_name} ${nurse.last_name}`,
			};
		});

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
		const res = await GetAllSchedules();

		if (res.success) {
			var restructured = res.data.map((sc) => {
				return {
					_id: sc._id,
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
		getAllNurses();
		getAllShifts();
		getAllSchedules();
	}, []);

	return (
		<div>
			<Helmet>
				<title>Manage Schedules - Lampara</title>
				<meta property="og:title" content="Schedule-Nurses - Lampara" />
			</Helmet>

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
					className="text-sm px-2 py-1 border-2 rounded-md"
					selected={startDate}
					onChange={(date) => {
						setStartDate(date);
						setNewSchedule({ ...newSchedule, date: date });
					}}
				/>

				<LamparaButton onClick={createSchedule} label={'Create'} />
			</CustomModal>
			<div className="flex flex-col">
				<p className="text-2xl font-semibold">
					{moment().format('dddd, MMMM D, YYYY')}
				</p>
			</div>
			<div className="lg:px-24 py-16">
				<div className="flex justify-end py-2 gap-x-2">
					<LamparaButton onClick={toggleModal} label={'Create Schedule'} />
				</div>
				<ScheduleCalendar
					shifts={shifts}
					getSchedules={getAllSchedules}
					events={schedules}
					editable={true}
				/>
			</div>
		</div>
	);
};

export default ManageSchedule;
