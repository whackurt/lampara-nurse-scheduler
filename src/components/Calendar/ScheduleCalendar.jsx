import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import ScheduleCard from '../Card/ScheduleCard';
import CustomModal from '../Modal/CustomModal';
import moment from 'moment';
import LamparaDropdown from '../Button/LamparaDropdown';
import { GetAllDepartments } from '../../services/department.services';
import { TbFilterX } from 'react-icons/tb';

const ScheduleCalendar = ({
	editable = false,
	events,
	getSchedules,
	shifts,
	setKeyword,
	nurses,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [date, setDate] = useState('');
	const [scheduledNurses, setScheduledNurses] = useState([]);

	const [departments, setDepartments] = useState([]);

	const toggleModal = (arg) => {
		setDate(arg.dateStr);

		const filtered = events.filter((ev) => ev.date === arg.dateStr);
		setScheduledNurses(filtered);

		setShowModal(!showModal);
	};

	const getDepartments = async () => {
		const res = await GetAllDepartments();
		const departments = res.data;

		var restructured = departments.map((dept) => {
			return {
				value: dept.name,
				label: dept.name,
			};
		});

		restructured = [...restructured, { value: '', label: 'None' }];

		setDepartments(restructured);
	};

	useEffect(() => {
		getDepartments();
	}, []);

	return (
		<>
			<div className="flex items-center gap-x-2">
				<button
					onClick={() => setKeyword('')}
					className="border cursor-pointer hover:shadow-md p-2 rounded-md"
				>
					<TbFilterX size={15} color="#404040" />
				</button>

				<LamparaDropdown
					label={'Filter by Department'}
					placeholder={'Select department'}
					options={departments}
					required={false}
					width={'w-56'}
					onChange={(option) => setKeyword(option.value)}
				/>
				<LamparaDropdown
					label={'Filter by Nurse'}
					placeholder={'Select nurse'}
					options={nurses}
					required={false}
					width={'w-56'}
					onChange={(option) => setKeyword(option.label)}
				/>
			</div>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={toggleModal}
				weekends={true}
				events={events}
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
							shifts={shifts}
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
