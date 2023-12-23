import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NurseSideBar = () => {
	const navigate = useNavigate();

	const logout = async () => {
		localStorage.clear();
		navigate('/nurse/login');
	};
	return (
		<>
			<Link to="/nurse" className="account-nurses-navlink">
				<img
					alt="image"
					src="/public/LAMPARA/logo1-200h.png"
					className="account-nurses-image1"
				/>
			</Link>
			<Link to="/nurse" className="account-nurses-navlink1">
				<h1 className="account-nurses-text14">LAMPARA</h1>
			</Link>
			<Link to="/nurse" className="account-nurses-navlink2 button">
				Scheduler
			</Link>
			<Link to="/nurse" className="dashboard-nurses-navlink3 button">
				My Schedule
			</Link>
			<Link to="/nurse/messages" className="dashboard-nurses-navlink4 button">
				Messages
			</Link>
			<Link to="/nurse/my-account" className="dashboard-nurses-navlink7 button">
				Account Settings
			</Link>
			<button onClick={() => logout()} className="dashboard-navlink8 button">
				Log Out
			</button>
		</>
	);
};

export default NurseSideBar;
