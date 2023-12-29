import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LoginAdmin } from '../../services/auth.services';
import AppIcon from '../../assets/icon.png';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import LamparaButton from '../../components/Button/LamparaButton';

const AdminLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const login = async () => {
		setError(false);
		setLoading(true);

		const res = await LoginAdmin({ username: username, password: password });

		if (res.status == 200) {
			localStorage.setItem('adminToken', res.data.token);
			localStorage.setItem('adminId', res.data.id);
			localStorage.setItem('adminUserId', res.data.adminUserId);
			localStorage.setItem('adminUsername', res.data.username);
			navigate('/admin');
		} else {
			setError(true);
		}
		setLoading(false);
	};

	return (
		<div className="flex text-primary bg-mainBgColor w-full h-screen justify-center items-center">
			<HelmetProvider>
				<Helmet>
					<title>Login - Lampara</title>
					<meta property="og:title" content="Lampara" />
				</Helmet>
			</HelmetProvider>
			<div className="flex flex-col items-center justify-center">
				<img src={AppIcon} width={100} alt="Lampara" />

				<h1 className="font-bold text-2xl text-primary font-inter">LAMPARA</h1>
				<p>Admin</p>
				<div className="mt-4">
					<LamparaInputForm
						type="text"
						label="Username"
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
					/>
					<LamparaInputForm
						type="password"
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
			</div>
		</div>
	);
};

export default AdminLogin;
