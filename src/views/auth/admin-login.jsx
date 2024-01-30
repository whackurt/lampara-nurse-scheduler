import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LoginAdmin } from '../../services/auth.services';
import Icon from '../../assets/skedio-icon.png';
import Logo from '../../assets/skedio-logo.png';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import LamparaButton from '../../components/Button/LamparaButton';

const AdminLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const login = async () => {
		setError(false);
		setErrorMsg('');
		setLoading(true);

		if (username != '' && password != '') {
			const res = await LoginAdmin({ username: username, password: password });

			if (res.status == 200) {
				localStorage.setItem('adminToken', res.data.token);
				localStorage.setItem('adminId', res.data.adminId);
				localStorage.setItem('userId', res.data.adminUserId);
				localStorage.setItem('adminUsername', res.data.username);
				navigate('/admin');
			} else {
				setError(true);
				setErrorMsg('Invalid username or password');
			}
		} else {
			setError(true);
			setErrorMsg('Username and password are required.');
		}

		setLoading(false);
	};

	return (
		<div className="bg-nurse-background bg-cover bg-center h-screen w-full font-nunito">
			<HelmetProvider>
				<Helmet>
					<title>Login - sked.io</title>
					<meta property="og:title" content="sked.io" />
				</Helmet>
			</HelmetProvider>

			<div className="flex justify-center pt-16 px-4">
				<div className="flex flex-col items-center justify-center shadow-lg rounded-md py-16 bg-white w-full lg:w-1/3">
					<img src={Icon} width={80} alt="Lampara" />
					<p className="text-primary uppercase text-sm font-bold">Admin</p>
					<div className="my-6 text-center text-secondary">
						<h1 className="font-bold text-3xl lg:text-4xl text-slate-800">
							Welcome back
						</h1>
						<p>Login to your account below.</p>
					</div>

					<div className="w-full px-4 lg:px-12">
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
						<div className="flex justify-end">
							<p className="text-xs text-secondary">Forgot password?</p>
						</div>

						<div className="flex justify-center items-center h-4 ">
							<p className="text-red-500 text-xs text-center">
								{error && errorMsg}
							</p>
						</div>

						<LamparaButton
							width={'w-full'}
							label="Login"
							loading={loading}
							loadingText="Logging in..."
							onClick={() => login()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
