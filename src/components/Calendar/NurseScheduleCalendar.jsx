import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CustomModal from '../Modal/CustomModal';
import moment from 'moment';
import NurseScheduleCard from '../Card/NurseScheduleCard';

const NurseScheduleCalendar = ({ editable = false, events }) => {
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
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={toggleModal}
				weekends={true}
				events={events}
				dayMaxEventRows={3}
				eventBackgroundColor="#288a01"
				eventBorderColor="#FFFFFF"
			/>
			<CustomModal
				title={moment(date).format('MMMM D, YYYY')}
				showModal={showModal}
				toggleModal={toggleModal}
			>
				{scheduledNurses.length > 0 ? (
					scheduledNurses.map((sc) => (
						<NurseScheduleCard time={sc.title} dept={sc.dept} />
					))
				) : (
					<p className="text-xs">You do not have schedule on this date.</p>
				)}
			</CustomModal>
		</>
	);
};

export default NurseScheduleCalendar;
