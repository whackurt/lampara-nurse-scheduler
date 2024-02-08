import React, { useState } from 'react';
import Control from '../../../src/assets/control.png';
import Icon from '../../../src/assets/skedle-icon.png';
import Logo from '../../../src/assets/skedle-logo.png';
import AdminIcon from '../../assets/admin-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { TbNurse } from 'react-icons/tb';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { TbSettings } from 'react-icons/tb';
import { TbLogout2 } from 'react-icons/tb';
import CustomModal from '../Modal/CustomModal';
import LamparaButton from '../Button/LamparaButton';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuCalendarClock } from 'react-icons/lu';
import { GoOrganization } from 'react-icons/go';

const AdminLayout = ({ children, location, icon }) => {
	const [open, setOpen] = useState(true);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const Menus = [
		{
			title: 'Dashboard',
			icon: <MdOutlineDashboard size={25} color="#0077B6" />,
			route: '/admin',
		},
		{
			title: 'Messages',
			icon: <BiMessageSquareDetail size={25} color="#0077B6" />,
			route: '/admin/messages',
		},

		{
			title: 'Manage Schedules',
			icon: <HiOutlineCalendarDays size={25} color="#0077B6" />,
			route: '/admin/manage-schedules',
		},
		{
			title: 'Manage Nurses',
			icon: <TbNurse size={25} color="#0077B6" />,
			route: '/admin/manage-nurses',
		},
		{
			title: 'Manage Shifts',
			icon: <LuCalendarClock size={25} color="#0077B6" />,
			route: '/admin/manage-shifts',
		},
		{
			title: 'Manage Departments',
			icon: <GoOrganization size={25} color="#0077B6" />,
			route: '/admin/manage-departments',
		},
	];

	const toggleLogoutModal = () => {
		setShowLogoutModal(!showLogoutModal);
	};

	const logout = () => {
		localStorage.removeItem('adminToken');
		localStorage.removeItem('adminId');
		localStorage.removeItem('adminUserId');
		localStorage.removeItem('adminUsername');
		navigate('/admin/login');
	};

	return (
		<div className="flex font-nunito text-primary w-full overflow-x-auto">
			<CustomModal
				title={'Confirm Logout'}
				showModal={showLogoutModal}
				toggleModal={toggleLogoutModal}
			>
				<p className="text-secondary">Are you sure you want to logout?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Logout'}
						loading={loading}
						loadingText={'Deleting...'}
						bgColor="bg-red-500"
						width={'w-[100px]'}
						onClick={() => logout()}
					/>
				</div>
			</CustomModal>
			<div
				className={` ${
					open ? 'w-56' : 'w-20 '
				} bg-slate-900 h-screen p-5 shadow-md pt-8 fixed top-0 left duration-300 `}
			>
				<img
					src={Control}
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
					onClick={() => setOpen(!open)}
				/>

				<div className="flex gap-x-4 items-center">
					<img
						width={40}
						src={Icon}
						className={`cursor-pointer duration-500`}
					/>
					<div className="flex flex-col">
						<div
							className={`text-primary origin-left font-bold text-lg duration-200 ${
								!open && 'scale-0'
							}`}
						>
							<img
								width={80}
								src={Logo}
								className={`cursor-pointer duration-500`}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center mt-10 ">
					{/* <CgProfile size={40} color="#454545" />
					<p className="text-lg font-bold text-secondary">Admin</p> */}

					<img src={AdminIcon} width={60} />
				</div>
				<div className="flex flex-col justify-between">
					<ul className="pt-6">
						{Menus.map((Menu, index) => (
							<Link to={Menu.route} key={index}>
								<li
									key={index}
									className={`flex ${
										location === Menu.title
											? 'text-primary bg-slate-800'
											: 'text-slate-300'
									} rounded-md p-2 cursor-pointer hover:bg-slate-700 text-primary text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
										index === 0 && 'bg-light-white'
									} `}
								>
									{Menu.icon}
									<span
										className={`${
											!open && 'hidden'
										} origin-left duration-200 font-semibold`}
									>
										{Menu.title}
									</span>
								</li>
							</Link>
						))}
					</ul>

					<div className="flex flex-col mt-8">
						<Link
							to={'/admin/my-account'}
							className={`${
								location === 'Account Settings'
									? 'text-primary bg-slate-800'
									: 'text-slate-300'
							} flex items-center hover:bg-slate-700 h-12 rounded-md gap-x-4 px-2`}
						>
							<TbSettings size={25} color="#0077B6" />
							<p
								className={`${
									!open && 'hidden'
								} origin-left duration-200 text-sm  font-semibold`}
							>
								Account Settings
							</p>
						</Link>

						<div
							onClick={() => toggleLogoutModal()}
							className="flex items-center hover:bg-slate-800 h-12 rounded-md cursor-pointer gap-x-4 px-2"
						>
							<TbLogout2 size={25} color="#b50d1e" />
							<a
								className={`${
									!open && 'hidden'
								} origin-left text-sm text-red-500 duration-200  font-normal`}
							>
								Logout
							</a>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`h-screen w-full overflow-y-auto p-4 bg-gray-100 ${
					open ? 'ml-56' : 'ml-20'
				} duration-300 `}
			>
				<div className="flex justify-between gap-x-2 items-center w-full px-4 rounded-md bg-white h-12">
					<div className="flex items-center gap-x-2">
						{icon}
						<p className="font-bold text-secondary">{location}</p>
					</div>
					<div>
						<IoMdNotificationsOutline
							className="cursor-pointer"
							size={25}
							color="#454545"
						/>
					</div>
				</div>
				<div className="bg-white my-4 overflow-hidden rounded-md text-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
