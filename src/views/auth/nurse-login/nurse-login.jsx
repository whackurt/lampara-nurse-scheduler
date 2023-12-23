import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import './nurse-login.css';
import { LoginNurse } from '../../../services/auth.services';

const NurseLogin = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const login = async () => {
		setError(false);
		setLoading(true);

		const res = await LoginNurse({ username: username, password: password });
		console.log(res);
		if (res.status == 200) {
			localStorage.setItem('nurseToken', res.data.token);
			navigate('/nurse');
		} else {
			setError(true);
		}
		setLoading(false);
	};

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
				placeholder="Enter your username"
				onChange={(e) => setUsername(e.target.value)}
				className="home-textinput input"
			/>
			<input
				type="password"
				name="Password"
				required
				placeholder="Enter your password"
				onChange={(e) => setPassword(e.target.value)}
				className="home-textinput1 input"
			/>
			<span className="home-text1">Username</span>
			<Link to="/forgot-password" className="home-navlink">
				Forgot Password?
			</Link>
			<span className="home-text2">Password</span>
			<button onClick={() => login()} className="home-navlink1 button">
				{loading ? 'Logging in... ' : 'Login'}
			</button>
			<p className="home-text3">
				{error ? 'Invalid Username or Password' : ''}
			</p>
			<img alt="image" src="/LAMPARA/logo1-200h.png" className="home-image" />
		</div>
	);
};

export default NurseLogin;
