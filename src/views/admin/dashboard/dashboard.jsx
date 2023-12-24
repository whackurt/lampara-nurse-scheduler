import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { Helmet } from 'react-helmet';

import './dashboard.css';
import AdminSideBar from '../../../components/SideBar/AdminSideBar';

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
		<div className="">
			<Helmet>
				<title>Dashboard - Lampara</title>
				<meta property="og:title" content="Dashboard - Lampara" />
			</Helmet>
		</div>
	);
};

export default Dashboard;
