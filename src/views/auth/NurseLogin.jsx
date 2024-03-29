import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LoginNurse } from '../../services/auth.services';
import LamparaButton from '../../components/Button/LamparaButton';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import Icon from '../../assets/skedle-icon.png';
import LamparaAuthForm from '../../components/Forms/LamparaAuthForm';

const NurseLogin = (props) => {
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
			const res = await LoginNurse({ username: username, password: password });

			if (res.status == 200) {
				localStorage.setItem('nurseToken', res.data.token);
				localStorage.setItem('nurseId', res.data.nurseId);
				localStorage.setItem('nurseUserId', res.data.nurseUserId);
				navigate('/nurse');
			} else {
				setError(true);
				setErrorMsg('Invalid username or password');
			}
		} else {
			setError(true);
			setErrorMsg('Username and password are required');
		}

		setLoading(false);
	};

	return (
		<div className="bg-nurse-background bg-cover bg-center h-screen w-full font-nunito">
			<HelmetProvider>
				<Helmet>
					<title>Login - skedle</title>
					<meta property="og:title" content="skedle" />
				</Helmet>
			</HelmetProvider>

			<div className="flex justify-center pt-16 px-4">
				<div className="flex flex-col items-center justify-center shadow-xl rounded-md py-16 bg-white w-full max-w-[450px]">
					<img src={Icon} width={80} alt="Lampara" />
					<p className="text-primary uppercase text-sm font-bold">Nurse</p>
					<div className="my-6 text-center text-secondary">
						<h1 className="font-bold text-3xl lg:text-4xl text-slate-800">
							Welcome back
						</h1>
						<p>Login to your account below.</p>
					</div>

					<div className="w-full px-4 lg:px-12">
						<LamparaAuthForm
							type="text"
							label="Username"
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
						/>

						<LamparaAuthForm
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

export default NurseLogin;
