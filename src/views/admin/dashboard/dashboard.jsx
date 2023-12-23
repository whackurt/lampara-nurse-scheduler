import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { Helmet } from 'react-helmet';

import './dashboard.css';
import AdminSideBar from '../../../components/AdminSideBar';

const Dashboard = (props) => {
	const currentDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const [popupDate, setPopupDate] = useState(null);

	const handleDateClick = (arg) => {
		// Set the clicked date to show in the pop-up
		setPopupDate(arg.dateStr);
	};

	const closePopup = () => {
		// Close the pop-up
		setPopupDate(null);
	};

	return (
		<div className="dashboard-container">
			<Helmet>
				<title>Dashboard - Lampara</title>
				<meta property="og:title" content="Dashboard - Lampara" />
			</Helmet>
			<div className="dashboard-container1">
				<svg viewBox="0 0 1024 1024" className="dashboard-icon">
					<path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
				</svg>
				<h1 className="dashboard-text">Dashboard</h1>
			</div>
			<div className="dashboard-container2">
				<h1 className="dashboard-text02">Greetings!</h1>
				<span className="dashboard-text03">{currentDate}</span>
			</div>
			<AdminSideBar />
			<div className="dashboard-container5">
				<div className="dashboard-container6">
					<svg viewBox="0 0 1024 1024" className="dashboard-icon17">
						<path d="M512 598q108 0 225 47t117 123v86h-684v-86q0-76 117-123t225-47zM512 512q-70 0-120-50t-50-120 50-121 120-51 120 51 50 121-50 120-120 50z"></path>
					</svg>
					<span className="dashboard-text06">User</span>
					<span className="dashboard-text07">15</span>
					<span className="dashboard-text08">Total Users</span>
					<span className="dashboard-text09">1</span>
					<span className="dashboard-text10">Online</span>
				</div>
				<div className="dashboard-container7">
					<svg
						viewBox="0 0 804.5714285714286 1024"
						className="dashboard-icon19"
					>
						<path d="M731.429 402.286c0-20-16.571-36.571-36.571-36.571s-36.571 16.571-36.571 36.571 16.571 36.571 36.571 36.571 36.571-16.571 36.571-36.571zM804.571 402.286c0 48-30.286 88-73.143 103.429v225.714c0 121.143-114.857 219.429-256 219.429s-256-98.286-256-219.429v-75.429c-124-15.429-219.429-106.857-219.429-217.143v-292.571c0-20 16.571-36.571 36.571-36.571 3.429 0 6.286 0.571 9.143 1.143 12.571-22.286 36.571-37.714 64-37.714 40.571 0 73.143 32.571 73.143 73.143s-32.571 73.143-73.143 73.143c-13.143 0-25.714-4-36.571-10.286v229.714c0 80.571 82.286 146.286 182.857 146.286s182.857-65.714 182.857-146.286v-229.714c-10.857 6.286-23.429 10.286-36.571 10.286-40.571 0-73.143-32.571-73.143-73.143s32.571-73.143 73.143-73.143c27.429 0 51.429 15.429 64 37.714 2.857-0.571 5.714-1.143 9.143-1.143 20 0 36.571 16.571 36.571 36.571v292.571c0 110.286-95.429 201.714-219.429 217.143v75.429c0 80.571 82.286 146.286 182.857 146.286s182.857-65.714 182.857-146.286v-225.714c-42.857-15.429-73.143-55.429-73.143-103.429 0-60.571 49.143-109.714 109.714-109.714s109.714 49.143 109.714 109.714z"></path>
					</svg>
					<span className="dashboard-text11">Nurses</span>
					<span className="dashboard-text12">6</span>
					<span className="dashboard-text13">Scheduled Today</span>
				</div>
				<div className="dashboard-container8">
					{/* Render FullCalendar component with plugins */}
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin]}
						initialView="dayGridMonth"
						events={[
							// Add your events data here
							{ date: '2023-10-06' },
							{ date: '2023-10-07' },
							// Add more events as needed
						]}
						dateClick={handleDateClick} // Attach the dateClick handler
					/>
				</div>
				{popupDate && (
					<div className="popup-container">
						<div className="popup-content">
							{/* Display assigned nurses for the clicked date */}
							<h2>Nurses Scheduled for {popupDate}</h2>
							{/* Nurse 1 schedule */}
							<div className="nurse-schedule">
								<h3>Nurse 1</h3>
								<p>Time: 8:00 AM - 4:00 PM</p>
								<p>Department: Pediatrics</p>
							</div>
							{/* Nurse 2 schedule */}
							<div className="nurse-schedule">
								<h3>Nurse 2</h3>
								<p>Time: 12:00 PM - 8:00 PM</p>
								<p>Department: Emergency Room</p>
							</div>
							{/* Add more nurse schedules as needed */}
							<button onClick={closePopup}>Close</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
