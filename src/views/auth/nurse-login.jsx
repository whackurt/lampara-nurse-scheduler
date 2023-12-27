import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LoginNurse } from '../../services/auth.services';
import AppIcon from '../../assets/icon.png';
import LamparaButton from '../../components/Button/LamparaButton';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';

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

		if (res.status == 200) {
			localStorage.setItem('nurseToken', res.data.token);
			localStorage.setItem('nurseId', res.data.nurseId);
			localStorage.setItem('nurseUserId', res.data.nurseUserId);
			navigate('/nurse');
		} else {
			setError(true);
		}
		setLoading(false);
	};

	return (
		<div className="flex text-primary bg-mainBgColor w-full h-screen justify-center items-center">
			<Helmet>
				<title>Login - Lampara</title>
				<meta property="og:title" content="Lampara" />
			</Helmet>
			<div className="flex flex-col items-center justify-center">
				<img src={AppIcon} width={100} alt="Lampara" />

				<h1 className="font-bold text-2xl text-primary font-inter">LAMPARA</h1>
				<p>Nurse</p>
				<div className="mt-4">
					<LamparaInputForm
						label="Username"
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
					/>
					<LamparaInputForm
						type={'password'}
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
					/>
				</div>

				<p className="text-red-500 text-xs">
					{error ? 'Invalid username or password' : ''}
				</p>

				<LamparaButton
					width={'w-full'}
					label="Login"
					loading={loading}
					loadingText="Logging in..."
					onClick={() => login()}
				/>
				<Link to={'/forgot-password'}>
					<p className="text-xs text-slate-600">Forgot password?</p>
				</Link>
			</div>
		</div>
	);
};

export default NurseLogin;
