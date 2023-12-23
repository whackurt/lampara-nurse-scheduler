import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './change-password.css';

const ChangePassword = (props) => {
	return (
		<div className="change-password-container">
			<Helmet>
				<title>Change Password - Lampara</title>
				<meta property="og:title" content="Change-Password - Lampara" />
			</Helmet>
			<div className="change-password-container1"></div>
			<h1 className="change-password-text">Change Password</h1>
			<img
				alt="image"
				src="/LAMPARA/logo1-200h.png"
				className="change-password-image"
			/>
			<input
				type="password"
				name="Password"
				required
				placeholder="Enter New Password"
				className="change-password-textinput input"
			/>
			<input
				type="password"
				name="Password"
				required
				placeholder="Confirm New Password"
				className="change-password-textinput1 input"
			/>
			<span className="change-password-text1">Remember your password? </span>
			<Link to="/home" className="change-password-navlink">
				Log in Here
			</Link>
			<span className="change-password-text5">New Password</span>
			<span className="change-password-text6">Confirm Password</span>
			<Link to="/" className="change-password-navlink1 button">
				Reset Password
			</Link>
		</div>
	);
};

export default ChangePassword;
