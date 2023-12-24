import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import './nurses.css';
import AdminSideBar from '../../../components/SideBar/AdminSideBar';

const Nurses = (props) => {
	const [isAddUserWindowVisible, setAddUserWindowVisible] = useState(false);
	const [isFilterWindowVisible, setFilterWindowVisible] = useState(false);

	const [newUserInfo, setNewUserInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		department: '',
		password: '',
	});

	const [filterOptions, setFilterOptions] = useState({
		byDepartment: false,
		alphabetically: false,
	});

	const handleAddUserClick = () => {
		setAddUserWindowVisible(!isAddUserWindowVisible);
	};

	const handleFilterClick = () => {
		setFilterWindowVisible(!isFilterWindowVisible);
	};

	const handleFilterOptionChange = (option) => {
		setFilterOptions({
			...filterOptions,
			[option]: !filterOptions[option],
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewUserInfo({
			...newUserInfo,
			[name]: value,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Add your logic to handle the form submission, e.g., send the data to the server
		console.log('Submitted:', newUserInfo);
		// You may want to reset the form or close the floating window after submission
		setNewUserInfo({ name: '', username: '', password: '' });
		setAddUserWindowVisible(false);
	};

	const handleExitClick = () => {
		setAddUserWindowVisible(false);
		setFilterWindowVisible(false);
	};

	return (
		<div className="nurses-container">
			<Helmet>
				<title>Manage Nurses - Lampara</title>
				<meta property="og:title" content="Nurses - Lampara" />
			</Helmet>
			<div className="nurses-container1">
				<svg viewBox="0 0 1024 1024" className="nurses-icon">
					<path d="M512 598q108 0 225 47t117 123v86h-684v-86q0-76 117-123t225-47zM512 512q-70 0-120-50t-50-120 50-121 120-51 120 51 50 121-50 120-120 50z"></path>
				</svg>
				<h1 className="nurses-text">Manage Nurses</h1>
			</div>
			<div className="nurses-container2">
				<AdminSideBar />
				<div className="nurses-container4">
					<span className="nurses-text04" onClick={handleAddUserClick}>
						Add Nurses
					</span>
					<span className="nurses-text05" onClick={handleFilterClick}>
						Filter
					</span>
					<svg viewBox="0 0 804.5714285714286 1024" className="nurses-icon15">
						<path d="M801.714 168.571c5.714 13.714 2.857 29.714-8 40l-281.714 281.714v424c0 14.857-9.143 28-22.286 33.714-4.571 1.714-9.714 2.857-14.286 2.857-9.714 0-18.857-3.429-25.714-10.857l-146.286-146.286c-6.857-6.857-10.857-16-10.857-25.714v-277.714l-281.714-281.714c-10.857-10.286-13.714-26.286-8-40 5.714-13.143 18.857-22.286 33.714-22.286h731.429c14.857 0 28 9.143 33.714 22.286z"></path>
					</svg>
					<span className="nurses-text06">Delete</span>
					<span className="nurses-text07">Edit</span>
					<svg viewBox="0 0 1024 1024" className="nurses-icon17">
						<path d="M864 0c88.364 0 160 71.634 160 160 0 36.020-11.91 69.258-32 96l-64 64-224-224 64-64c26.742-20.090 59.978-32 96-32zM64 736l-64 288 288-64 592-592-224-224-592 592zM715.578 363.578l-448 448-55.156-55.156 448-448 55.156 55.156z"></path>
					</svg>
					<svg viewBox="0 0 1024 1024" className="nurses-icon19">
						<path d="M768 298.667v554.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-426.667c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-554.667zM725.333 213.333v-42.667c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504h-170.667c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v42.667h-170.667c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667h42.667v554.667c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h426.667c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-554.667h42.667c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667zM384 213.333v-42.667c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501h170.667c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v42.667z"></path>
					</svg>
					<input
						type="text"
						name="Password"
						required
						placeholder="   "
						className="nurses-textinput input"
					/>
					<svg viewBox="0 0 1024 1024" className="nurses-icon21">
						<path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
					</svg>
					<svg viewBox="0 0 1024 1024" className="nurses-icon23">
						<path d="M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531zM341.333 554.667h128v128c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-128h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-128v-128c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v128h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
					</svg>
				</div>
			</div>
			<div className="nurses-container5">
				<div className="nurses-container6"></div>
				<span className="nurses-text08">Gmail</span>
				<span className="nurses-text09">Last Name</span>
				<span className="nurses-text10">First Name</span>
				<span className="nurses-text11">
					<span> Nurse </span>
					<span> ID </span>
				</span>
				<span className="nurses-text16">2021304885</span>
				<span className="nurses-text17">pasalfrichel@gmail.com</span>
				<span className="nurses-text18">Department</span>
				<span className="nurses-text19">Emergency</span>
				<input type="checkbox" className="nurses-checkbox" />
				<input type="checkbox" className="nurses-checkbox1" />
				<span className="nurses-text14">Pasal</span>
				<span className="nurses-text15">Frichel Joan</span>
			</div>
			{isAddUserWindowVisible && (
				<div className="floating-window">
					{/* Exit button (X) in the top right corner */}
					<button className="exit-button" onClick={handleExitClick}>
						X
					</button>
					{/* Title of the floating window */}
					<h2 className="floating-window-title">Add User</h2>
					{/* Content of the floating window */}
					<form onSubmit={handleFormSubmit}>
						<label>
							First Name:
							<input
								type="text"
								name="firstName"
								value={newUserInfo.firstName}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Last Name:
							<input
								type="text"
								name="lastName"
								value={newUserInfo.lastName}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Email:
							<input
								type="text"
								name="email"
								value={newUserInfo.email}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Username:
							<input
								type="text"
								name="username"
								value={newUserInfo.username}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Department:
							<input
								type="text"
								name="department"
								value={newUserInfo.department}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Password:
							<input
								type="password"
								name="password"
								value={newUserInfo.password}
								onChange={handleInputChange}
								required
							/>
						</label>
						<button type="submit" className="submit-button">
							Submit
						</button>
					</form>
				</div>
			)}
			{isFilterWindowVisible && (
				<div className="floating-window">
					{/* Exit button (X) in the top right corner */}
					<button className="exit-button" onClick={handleExitClick}>
						X
					</button>
					{/* Title of the floating window */}
					<h2 className="floating-window-title">Filter Options</h2>
					{/* Content of the floating window */}
					<div>
						<label>
							<input
								type="checkbox"
								checked={filterOptions.byDepartment}
								onChange={() => handleFilterOptionChange('byDepartment')}
							/>
							Department
						</label>
						<label>
							<input
								type="checkbox"
								checked={filterOptions.alphabetically}
								onChange={() => handleFilterOptionChange('alphabetically')}
							/>
							Alphabetically
						</label>
						{/* Add more filter options if needed */}
					</div>
				</div>
			)}
		</div>
	);
};

export default Nurses;
