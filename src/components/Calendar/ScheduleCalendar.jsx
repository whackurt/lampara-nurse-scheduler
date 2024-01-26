import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleCard from '../Card/ScheduleCard';
import CustomModal from '../Modal/CustomModal';
import moment from 'moment';

const ScheduleCalendar = ({
	editable = false,
	events,
	getSchedules,
	shifts,
	setKeyword,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [date, setDate] = useState('');
	const [scheduledNurses, setScheduledNurses] = useState([]);

	const toggleModal = (arg) => {
		setDate(arg.dateStr);

		const filtered = events.filter((ev) => ev.date === arg.dateStr);
		setScheduledNurses(filtered);

		setShowModal(!showModal);
	};

	return (
		<>
			<div className="mb-2">
				<input
					className="border-2 px-2 py-1 rounded-md"
					placeholder="Search"
					type="text"
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</div>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={toggleModal}
				weekends={true}
				events={events}
				dayMaxEventRows={3}
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
