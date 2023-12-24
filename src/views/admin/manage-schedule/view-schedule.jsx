import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Helmet } from 'react-helmet';
import './view-schedule.css';
import AdminSideBar from '../../../components/SideBar/AdminSideBar';

const ViewSchedule = (props) => {
	const calendarRef = useRef(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [newEvent, setNewEvent] = useState({
		title: '',
		start: '',
		end: '',
	});
	const [editedEvent, setEditedEvent] = useState({
		title: '',
		start: '',
		end: '',
	});

	const openCreateModal = () => {
		setShowCreateModal(true);
	};

	const openEditModal = () => {
		console.log('Edit button clicked');
		// Assuming you have the details of the event you want to edit, set them in the state
		const existingEvent = {
			title: 'blah', // Replace with the actual title
			start: 'Existing Start Time', // Replace with the actual start time
			end: 'Existing End Time', // Replace with the actual end time
			// Set other properties as needed
		};

		setEditedEvent(existingEvent);
		setShowEditModal(true);
	};

	const closeModal = () => {
		console.log('Close button clicked');
		setShowCreateModal(false);
		setShowEditModal(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Check if the modal is for editing, use editedEvent state
		const eventToUpdate = showEditModal ? editedEvent : newEvent;

		if (showEditModal) {
			setEditedEvent({
				...eventToUpdate,
				[name]: value,
			});
		} else {
			setNewEvent({
				...eventToUpdate,
				[name]: value,
			});
		}
	};

	const handleCreateSchedule = () => {
		const calendar = calendarRef.current;

		if (showEditModal && calendar) {
			// Logic for updating the edited event in the calendar
			// Replace with your logic to update the existing event
		} else if (calendar) {
			calendar.addEvent(newEvent);
		}

		closeModal();
	};

	useEffect(() => {
		const calendarEl = document.getElementById('full-calendar');

		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
			// Add other calendar options here
		});

		calendarRef.current = calendar;
		calendar.render();

		return () => {
			calendar.destroy();
		};
	}, []);

	return (
		<div className="view-schedule-container">
			<Helmet>
				<title>Manage Schedules - Lampara</title>
				<meta property="og:title" content="View-Schedule - Lampara" />
			</Helmet>
			<div className="view-schedule-container1">
				<div className="view-schedule-container2">
					<AdminSideBar />
				</div>
			</div>
			<div className="view-schedule-container4">
				<div className="view-schedule-container5">
					<div className="view-schedule-container6">
						{/* Add an element to render the FullCalendar */}
						<div id="full-calendar"></div>
					</div>
				</div>
			</div>
			<div className={`modal ${showCreateModal ? 'show' : ''}`}>
				<div className="modal-content">
					<span className="close" onClick={closeModal}>
						&times;
					</span>
					<h2>Create Schedule</h2>
					<form>
						<label>Title:</label>
						<input
							type="text"
							name="title"
							value={newEvent.title}
							onChange={handleInputChange}
						/>
						<label>Start Time:</label>
						<input
							type="text"
							name="start"
							value={newEvent.start}
							onChange={handleInputChange}
						/>
						<label>End Time:</label>
						<input
							type="text"
							name="end"
							value={newEvent.end}
							onChange={handleInputChange}
						/>
						{/* Additional Inputs */}
						<label>Starting Date:</label>
						<input
							type="text"
							name="dateRange"
							value={newEvent.dateRange}
							onChange={handleInputChange}
						/>
						<label>Ending Date:</label>
						<input
							type="text"
							name="timeRange"
							value={newEvent.timeRange}
							onChange={handleInputChange}
						/>
						<label>Add User:</label>
						<input
							type="text"
							name="addUser"
							value={newEvent.addUser}
							onChange={handleInputChange}
						/>
						<button
							type="button"
							className="view-schedule-buttons"
							onClick={handleCreateSchedule}
						>
							Save
						</button>
					</form>
				</div>
			</div>
			{/* Edit Schedule Modal */}
			<div className={`modal ${showEditModal ? 'show' : ''}`}>
				<div className="modal-content">
					<span className="close" onClick={closeModal}>
						&times;
					</span>
					<h2>Edit Schedule</h2>
					<form>
						<label>New Title:</label>
						<input
							type="text"
							name="title"
							value={showEditModal ? editedEvent.title : ''}
							onChange={handleInputChange}
						/>
						<label>New Start Time:</label>
						<input
							type="text"
							name="start"
							value={showEditModal ? editedEvent.start : ''}
							onChange={handleInputChange}
						/>
						<label>New End Time:</label>
						<input
							type="text"
							name="end"
							value={showEditModal ? editedEvent.end : ''}
							onChange={handleInputChange}
						/>
						<label>Users:</label>
						<input
							type="text"
							name="addUser"
							value={showEditModal ? editedEvent.addUser : ''}
							onChange={handleInputChange}
						/>
						<button
							type="button"
							className="view-schedule-buttons02"
							onClick={handleCreateSchedule}
						>
							Save Changes
						</button>
					</form>
				</div>
			</div>
			<svg viewBox="0 0 1024 1024" className="view-schedule-icon13">
				<path d="M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531zM469.333 256v256c0 16.597 9.472 31.019 23.595 38.144l170.667 85.333c21.077 10.539 46.72 2.005 57.259-19.072s2.005-46.72-19.072-57.259l-147.115-73.515v-229.632c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667z"></path>
			</svg>
			<div className="view-schedule-container7">
				<h1 className="view-schedule-text2">Manage Schedules</h1>
			</div>
			<div className="view-schedule-container8">
				<button
					id="edit-schedule-button"
					className="view-schedule-button5"
					onClick={openEditModal}
				>
					{' '}
					Edit Schedule{' '}
				</button>
				<button
					type="button"
					className="view-schedule-button6 button"
					onClick={openCreateModal}
				>
					Create Schedule
				</button>
				<h1 className="view-schedule-text4">These are the schedule today.</h1>
				<span className="view-schedule-text5">Tuesday, 06 October 2023</span>
			</div>
		</div>
	);
};

export default ViewSchedule;
