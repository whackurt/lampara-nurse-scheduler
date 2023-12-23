import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Helmet } from 'react-helmet';
import './schedule-nurses.css';


const ScheduleNurses = (props) => {
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
  }

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
    <div className="schedule-nurses-container">
      <Helmet>
        <title>Schedule-Nurses - Lampara</title>
        <meta property="og:title" content="Schedule-Nurses - Lampara" />
      </Helmet>
      <div className="schedule-nurses-container1">
      <div className="schedule-nurses-container2">
      <div className="schedule-nurses-container3">
          <h1 className="schedule-nurses-text">Nurse</h1>
          <svg viewBox="0 0 1024 1024" className="schedule-nurses-icon">
              <path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
          </svg>
          <svg viewBox="0 0 1024 1024" className="schedule-nurses-icon02">
              <path d="M917.806 229.076c-22.212-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.984 17.78 50.678 41.878 81.374 72.572zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.326 32 32 32h224v624z"></path>
              <path d="M736 832h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
              <path d="M736 704h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
              <path d="M736 576h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
            </svg>
          <svg viewBox="0 0 1024 1024" className="schedule-nurses-icon07">
              <path d="M512 598q108 0 225 47t117 123v86h-684v-86q0-76 117-123t225-47zM512 512q-70 0-120-50t-50-120 50-121 120-51 120 51 50 121-50 120-120 50z"></path>
          </svg>
          <svg viewBox="0 0 1024 1024" className="schedule-nurses-icon11">
              <path d="M512 662q62 0 106-44t44-106-44-106-106-44-106 44-44 106 44 106 106 44zM830 554l90 70q14 10 4 28l-86 148q-8 14-26 8l-106-42q-42 30-72 42l-16 112q-4 18-20 18h-172q-16 0-20-18l-16-112q-38-16-72-42l-106 42q-18 6-26-8l-86-148q-10-18 4-28l90-70q-2-14-2-42t2-42l-90-70q-14-10-4-28l86-148q8-14 26-8l106 42q42-30 72-42l16-112q4-18 20-18h172q16 0 20 18l16 112q38 16 72 42l106-42q18-6 26 8l86 148q10 18-4 28l-90 70q2 14 2 42t-2 42z"></path>
          </svg>
          <Link to="/dashboard" className="schedule-nurses-navlink">
              <img
                alt="image"
                src="/LAMPARA/logo1-200h.png"
                className="schedule-nurses-image"
              />
          </Link>
          <Link to="/dashboard-nurses" className="schedule-nurses-navlink1">
              <h1 className="schedule-nurses-text1">LAMPARA</h1>
          </Link>
          <Link to="/dashboard-nurses" className="schedule-nurses-navlink2 button">
              Scheduler
          </Link>
          <Link to="/dashboard-nurses" className="schedule-nurses-navlink3 button">
              Dashboard
          </Link>
          <Link to="/messages-nurses" className="schedule-nurses-navlink4 button">
              Messages
          </Link>
          <Link to="/schedule-nurses" className="schedule-nurses-navlink6 button">
              Schedule
          </Link>
          <Link to="/account-nurses" className="schedule-nurses-navlink7 button">
              Account Settings
          </Link>
        </div>
        </div>
      </div>
      <div className="schedule-nurses-container4">
        <div className="schedule-nurses-container5">
          <div className="schedule-nurses-container6">
            {/* Add an element to render the FullCalendar */}
            <div id="full-calendar"></div>
          </div>
        </div>
      </div>
      <div className="schedule-nurses-container7">
      <svg viewBox="0 0 1024 1024" className="view-schedule-icon13">
          <path d="M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531zM469.333 256v256c0 16.597 9.472 31.019 23.595 38.144l170.667 85.333c21.077 10.539 46.72 2.005 57.259-19.072s2.005-46.72-19.072-57.259l-147.115-73.515v-229.632c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667z"></path>
        </svg>
        <h1 className="schedule-nurses-text2">Schedule</h1>
        <h1 className="schedule-nurses-text3">Jabez Joshua</h1>
      </div>
      <div className="schedule-nurses-container8">
          <h1 className="schedule-nurses-text4">These are your schedule today.</h1>
          <span className="schedule-nurses-text5">Tuesday, 06 October 2023</span>
      </div>
    </div>
  );
};

export default ScheduleNurses;