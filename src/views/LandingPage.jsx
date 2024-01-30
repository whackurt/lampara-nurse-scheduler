import React from 'react';
import Logo from '../assets/skedio-logo.png';
import Icon from '../assets/skedio-icon.png';
import LamparaButton from '../components/Button/LamparaButton';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-nurse-background bg-cover flex font-nunito justify-center items-center w-full h-screen">
			<div className="flex flex-col items-center justify-center bg-white  rounded-md p-8">
				<h1 className="text-slate-600 text-3xl mb-2">Welcome to</h1>
				<div className="flex items-center gap-x-2">
					<div>
						<img src={Icon} width={40} alt="skedio-icon.png" />
					</div>
					<div>
						<img src={Logo} width={110} alt="skedio-logo.png" />
					</div>
				</div>
				<div className="py-2 bg-gray-200 rounded-md px-2 mt-6">
					<p className="font-bold text-lg text-gray-700">
						"Nurse scheduling at your fingertips."
					</p>
				</div>

				<div className="flex  gap-x-2">
					<LamparaButton
						onClick={() => navigate('/admin/login')}
						label={'Login as Admin'}
					/>
					<LamparaButton
						onClick={() => navigate('/nurse/login')}
						label={'Login as Nurse'}
					/>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
