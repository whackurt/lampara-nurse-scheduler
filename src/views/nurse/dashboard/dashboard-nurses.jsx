import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { Helmet } from 'react-helmet';

import './dashboard-nurses.css';
import NurseSideBar from '../../../components/NurseSideBar';

const DashboardNurses = (props) => {
	const currentDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="dashboard-nurses-container">
			<Helmet>
				<title>Dashboard - Lampara</title>
				<meta property="og:title" content="Dashboard - Lampara" />
			</Helmet>
			<div className="dashboard-nurses-container1">
				<svg viewBox="0 0 1024 1024" className="dashboard-nurses-icon">
					<path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
				</svg>
				<h1 className="dashboard-nurses-text">My Schedule</h1>
				<img
					alt="image"
					src="/LAMPARA/338316809_1456186771578578_5155093782169563773_n-200h.jpg"
					className="dashboard-nurses-image"
				/>
				<h1 className="dashboard-nurses-text01">Jabez Joshua</h1>
			</div>
			<div className="dashboard-nurses-container2">
				<h1 className="dashboard-nurses-text02">Hello, Jabez!</h1>
				<span className="dashboard-nurses-text03">{currentDate}</span>
			</div>
			<div className="dashboard-nurses-container3">
				<div className="dashboard-nurses-container4">
					<h1 className="dashboard-nurses-text04">Nurse</h1>
					<svg viewBox="0 0 1024 1024" className="dashboard-nurses-icon04">
						<path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
					</svg>
					<svg viewBox="0 0 1024 1024" className="dashboard-nurses-icon06">
						<path d="M917.806 229.076c-22.212-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.984 17.78 50.678 41.878 81.374 72.572zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.326 32 32 32h224v624z"></path>
						<path d="M736 832h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
						<path d="M736 704h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
						<path d="M736 576h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
					</svg>
					<svg viewBox="0 0 1024 1024" className="dashboard-nurses-icon15">
						<path d="M512 662q62 0 106-44t44-106-44-106-106-44-106 44-44 106 44 106 106 44zM830 554l90 70q14 10 4 28l-86 148q-8 14-26 8l-106-42q-42 30-72 42l-16 112q-4 18-20 18h-172q-16 0-20-18l-16-112q-38-16-72-42l-106 42q-18 6-26-8l-86-148q-10-18 4-28l90-70q-2-14-2-42t2-42l-90-70q-14-10-4-28l86-148q8-14 26-8l106 42q42-30 72-42l16-112q4-18 20-18h172q16 0 20 18l16 112q38 16 72 42l106-42q18-6 26 8l86 148q10 18-4 28l-90 70q2 14 2 42t-2 42z"></path>
					</svg>
					<NurseSideBar />
					<svg viewBox="0 0 1024 1024" className="dashboard-nurses-icon24">
						<path d="M768 640v-128h-320v-128h320v-128l192 192zM704 576v256h-320v192l-384-192v-832h704v320h-64v-256h-512l256 128v576h256v-192z"></path>
					</svg>
				</div>
			</div>
			<div className="dashboard-nurses-container5">
				<div className="dashboard-nurses-container8">
					{/* Render FullCalendar component with plugins */}
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin]}
						initialView="dayGridMonth"
						events={[
							// Add your events data here
							{ title: 'Event 1', date: '2023-10-06' },
							{ title: 'Event 2', date: '2023-10-07' },
							// Add more events as needed
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardNurses;
