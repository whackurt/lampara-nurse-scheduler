import React, { useState } from 'react';
import Control from '../../../src/assets/control.png';
import Logo from '../../../public/LAMPARA/logo1-200h.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHome, IoMdSettings } from 'react-icons/io';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { FaUserNurse } from 'react-icons/fa';
import { AiFillSchedule } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';

const AdminLayout = ({ children, location, icon }) => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const Menus = [
		{
			title: 'Dashboard',
			icon: <IoIosHome size={25} color="#24234d" />,
			route: '/admin',
		},
		{
			title: 'Messages',
			icon: <BiSolidMessageDetail size={25} color="#24234d" />,
			route: '/admin/messages',
		},
		{
			title: 'Manage Nurses',
			icon: <FaUserNurse size={25} color="#24234d" />,
			route: '/admin/manage-nurses',
		},
		{
			title: 'Manage Schedules',
			icon: <AiFillSchedule size={25} color="#24234d" />,
			route: '/admin/manage-schedules',
		},
	];

	const logout = () => {
		localStorage.removeItem('adminToken');
		localStorage.removeItem('adminId');
		navigate('/admin/login');
	};

	return (
		<div className="flex font-poppins text-primary w-full overflow-x-auto">
			<div
				className={` ${
					open ? 'w-72' : 'w-20 '
				} bg-white h-screen p-5 shadow-md pt-8 fixed top-0 left duration-300 `}
			>
				<img
					src={Control}
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
					onClick={() => setOpen(!open)}
				/>

				<div className="flex gap-x-4 items-center">
					<img
						width={60}
						src={Logo}
						className={`cursor-pointer duration-500`}
					/>
					<div className="flex flex-col">
						<div
							className={`text-primary origin-left font-bold text-lg duration-200 ${
								!open && 'scale-0'
							}`}
						>
							LAMPARA
							<p className="text-sm font-normal">Scheduler</p>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-10">
					<p className="font-bold">Admin</p>
				</div>
				<div className="flex flex-col justify-between">
					<ul className="pt-6">
						{Menus.map((Menu, index) => (
							<Link to={Menu.route} key={index}>
								<li
									key={index}
									className={`flex ${
										location === Menu.title ? 'text-primary' : 'text-slate-700'
									} rounded-md p-2 cursor-pointer hover:bg-slate-100 text-primary text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
										index === 0 && 'bg-light-white'
									} `}
								>
									{Menu.icon}
									<span
										className={`${
											!open && 'hidden'
										} origin-left duration-200  font-normal`}
									>
										{Menu.title}
									</span>
								</li>
							</Link>
						))}
					</ul>

					<div className="flex flex-col  mt-32">
						<Link
							to={'/admin/my-account'}
							className="flex items-center hover:bg-slate-100 h-12 rounded-md gap-x-4 px-2"
						>
							<IoMdSettings size={25} color="#24234d" />
							<p
								className={`${
									!open && 'hidden'
								} origin-left duration-200 text-sm  font-normal`}
							>
								Account Settings
							</p>
						</Link>
						<div
							onClick={() => logout()}
							className="flex items-center hover:bg-slate-100 h-12 rounded-md cursor-pointer gap-x-4 px-2"
						>
							<IoLogOut size={25} color="#b50d1e" />
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
					open ? 'ml-72' : 'ml-20'
				} duration-300 `}
			>
				<div className="flex justify-left gap-x-2 items-center w-full px-4 rounded-md bg-white h-12">
					{icon}
					<p className="font-bold text-primary">{location}</p>
				</div>
				<div className="bg-white my-4 rounded-md p-4 text-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
