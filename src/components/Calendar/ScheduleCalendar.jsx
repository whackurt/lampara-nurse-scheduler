import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ScheduleCard from '../Card/ScheduleCard';
import CustomModal from '../Modal/CustomModal';
import moment from 'moment';
import LamparaDropdown from '../Button/LamparaDropdown';
import { TbFilterX } from 'react-icons/tb';
import { useSearchStore } from '../../stores/useSearchStore';
import { useDepartmentStore } from '../../stores/useDepartmentStore';
import { useNurseStore } from '../../stores/useNurseStore';
import {
	restructureNurses,
	restructureShifts,
} from '../../helpers/restructure';
import { useShiftStore } from '../../stores/useShiftStore';

const ScheduleCalendar = ({ editable = false, getSchedules, schedules }) => {
	const keyword = useSearchStore((state) => state.keyword);
	const filterMode = useSearchStore((state) => state.filterMode);
	const setFilterMode = useSearchStore((state) => state.setFilterMode);
	const setKeyword = useSearchStore((state) => state.setKeyword);
	const execFilter = useSearchStore((state) => state.execFilter);
	const filteredSchedules = useSearchStore((state) => state.filteredSchedules);

	const getDepartments = useDepartmentStore((state) => state.getAllDepartments);
	const departments = useDepartmentStore((state) => state.allDepartments);

	const getAllShifts = useShiftStore((state) => state.getAllShifts);
	const shifts = useShiftStore((state) => state.allShifts);
	const [restructuredShifts, setRestructuredShifts] = useState([]);

	const getAllNurses = useNurseStore((state) => state.getAllNurses);
	const nurses = useNurseStore((state) => state.allNurses);
	const [restructuredNurses, setRestructuredNurses] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [date, setDate] = useState('');
	const [scheduledNurses, setScheduledNurses] = useState([]);

	const [restructuredDepts, setRestructuredDepts] = useState([]);

	const toggleModal = (arg) => {
		setDate(arg.dateStr);

		const filtered = schedules.filter((ev) => ev.date === arg.dateStr);
		setScheduledNurses(filtered);

		setShowModal(!showModal);
	};

	const _restructureDepartments = async () => {
		var restructured = departments.map((dept) => {
			return {
				value: dept.name,
				label: dept.name,
			};
		});

		setRestructuredDepts(restructured);
	};

	const _restructureNurses = async () => {
		if (nurses) {
			var restructured = restructureNurses(nurses);
			setRestructuredNurses(restructured);
		}
	};

	const _restructureShifts = () => {
		var restructured = restructureShifts(shifts);
		setRestructuredShifts(restructured);
	};

	useEffect(() => {
		getDepartments();
		getAllNurses();
		getAllShifts();
	}, []);

	useEffect(() => {
		_restructureDepartments();
		_restructureNurses();
		_restructureShifts();
	}, [departments, nurses, shifts]);

	useEffect(() => {
		execFilter(schedules, keyword);
	}, [keyword]);

	useEffect(() => {
		setKeyword('');
	}, [filterMode]);

	return (
		<>
			<div className="flex items-center gap-x-2">
				<button
					onClick={() => {
						setFilterMode('');
						setKeyword('');
					}}
					className="border cursor-pointer hover:shadow-md p-2 rounded-md"
				>
					<TbFilterX size={15} color="#404040" />
				</button>

				<LamparaDropdown
					label={'Filter by'}
					placeholder={filterMode}
					options={['Department', 'Nurse']}
					required={false}
					width={'w-56'}
					value={filterMode}
					onChange={(option) => setFilterMode(option.value)}
				/>
				<LamparaDropdown
					label={'Key'}
					placeholder={keyword}
					options={
						filterMode === 'Department'
							? restructuredDepts
							: filterMode === 'Nurse'
							? restructuredNurses
							: []
					}
					required={false}
					width={'w-56'}
					value={keyword}
					onChange={(option) => setKeyword(option.label)}
				/>
			</div>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={toggleModal}
				weekends={true}
				events={
					filterMode != '' && keyword != '' ? filteredSchedules : schedules
				}
				dayMaxEventRows={5}
				eventBackgroundColor="#0077B6"
				eventBorderColor="#FFFFFF"
			/>
			<CustomModal
				title={moment(date).format('MMMM D, YYYY')}
				showModal={showModal}
				toggleModal={toggleModal}
			>
				{scheduledNurses.length > 0 ? (
					scheduledNurses.map((sc) => (
						<ScheduleCard
							key={sc.title}
							id={sc._id}
							editable={editable}
							name={sc.title}
							time={sc.time}
							dept={sc.dept}
							toggleScheduleModal={setShowModal}
							showScheduleModal={showModal}
							getSchedules={getSchedules}
							shifts={restructuredShifts}
						/>
					))
				) : (
					<p className="text-xs">No nurse scheduled on this date</p>
				)}
			</CustomModal>
		</>
	);
};

export default ScheduleCalendar;
