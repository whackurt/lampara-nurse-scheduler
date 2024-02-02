import React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../assets/skedio-icon.png';
import Logo from '../../assets/skedio-logo.png';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import { IoHomeOutline } from 'react-icons/io5';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="flex font-nunito justify-center items-center h-screen w-full">
			<Helmet>
				<title>404 Not Found - sked.io</title>
			</Helmet>
			<div className="flex flex-col">
				<div className="flex justify-center gap-x-3 items-center">
					<div>
						<img width={50} src={Icon} alt="" />
					</div>
					<div>
						<img width={80} src={Logo} alt="" />
					</div>
				</div>
				<div className="flex justify-center pt-8 text-3xl font-bold text-secondary">
					<p>Oops...</p>
				</div>
				<div className="flex flex-col items-center justify-center">
					<TbError404 color="#0077B6" size={200} />
					<p className="font-bold text-primary">NOT FOUND</p>
				</div>
				<hr />
				<div>
					<p className="lg:text-lg text-center text-secondary font-semibold">
						The page you are looking for does not exist.
					</p>
				</div>
				<div className="flex justify-center">
					<LamparaTextButtonWithIcon
						icon={<IoHomeOutline size={20} />}
						label={'Go Back to Home'}
						bgColor="bg-red-500"
						width={'w-48'}
						onClick={() => navigate('/')}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
