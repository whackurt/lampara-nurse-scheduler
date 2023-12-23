import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import './nurse-login.css';

const NurseLogin = (props) => {
	return (
		<div className="home-container">
			<Helmet>
				<title>Lampara</title>
				<meta property="og:title" content="Lampara" />
			</Helmet>
			<div className="home-container1"></div>
			<h1 className="home-text">
				LAMPARA
				<br />
				<p className="font-light">Nurse</p>
			</h1>

			<input
				type="text"
				name="Username"
				required
				placeholder="  "
				className="home-textinput input"
			/>
			<input
				type="text"
				name="Password"
				required
				placeholder="   "
				className="home-textinput1 input"
			/>
			<span className="home-text1">Username</span>
			<Link to="/forgot-password" className="home-navlink">
				Forgot Password?
			</Link>
			<span className="home-text2">Password</span>
			<Link to="/dashboard-nurses" className="home-navlink1 button">
				Login
			</Link>
			<img alt="image" src="/LAMPARA/logo1-200h.png" className="home-image" />
		</div>
	);
};

export default NurseLogin;
