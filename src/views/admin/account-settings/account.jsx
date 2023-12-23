import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import './account.css';
import AdminSideBar from '../../../components/AdminSideBar';

const Account = (props) => {
	const [newPassword, setNew] = useState('');
	const [confirmPassword, setConfirm] = useState('');

	const handleInputChange = (event, inputType) => {
		const value = event.target.value;

		switch (inputType) {
			case 'fullName':
				setFullName(value);
				break;
			case 'address':
				setAddress(value);
				break;
			case 'id':
				setId(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'phoneNumber':
				setPhone(value);
				break;
			case 'currentPassword':
				setCurrent(value);
				break;
			case 'newPassword':
				setNew(value);
				break;
			case 'confirmPassword':
				setConfirm(value);
				break;
			default:
				break;
		}
	};

	const [isUploadModalOpen, setUploadModalOpen] = useState(false);

	const openUploadModal = () => {
		setUploadModalOpen(true);
	};

	const closeUploadModal = () => {
		setUploadModalOpen(false);
	};

	const handleFileChange = (event) => {
		// Handle file change logic here
		const selectedFile = event.target.files[0];
		console.log('Selected file:', selectedFile);
	};

	const handleUpload = () => {
		// Add your upload logic here
		// You can use a library like axios to send the file to your server
		// For now, let's just log a message
		console.log('File uploaded!');
		// Close the modal after uploading
		closeUploadModal();
	};

	return (
		<div className="account-container">
			<Helmet>
				<title>Account - Lampara</title>
				<meta property="og:title" content="Account - Lampara" />
			</Helmet>
			<div className="account-container1">
				<h1 className="account-text">Account Settings</h1>
				<div className="account-container2">
					<h1 className="account-text01">New Password</h1>
					<input
						type="text"
						onChange={(e) => handleInputChange(e, 'newPassword')}
						className="account-textinput input"
					/>
					<input
						type="text"
						onChange={(e) => handleInputChange(e, 'confirmPassword')}
						className="account-textinput1 input"
					/>
					<button
						onClick={() => alert('Hey')}
						className="input cursor-pointer save-btn"
					>
						Save
					</button>
					<h1 className="account-text04">Confirm New Password</h1>
				</div>
				<h1 className="account-text09">Change Password</h1>
				<button type="button" className="account-button8 button">
					<svg viewBox="0 0 1024 1024" className="account-icon">
						<path d="M512 662q62 0 106-44t44-106-44-106-106-44-106 44-44 106 44 106 106 44zM830 554l90 70q14 10 4 28l-86 148q-8 14-26 8l-106-42q-42 30-72 42l-16 112q-4 18-20 18h-172q-16 0-20-18l-16-112q-38-16-72-42l-106 42q-18 6-26-8l-86-148q-10-18 4-28l90-70q-2-14-2-42t2-42l-90-70q-14-10-4-28l86-148q8-14 26-8l106 42q42-30 72-42l16-112q4-18 20-18h172q16 0 20 18l16 112q38 16 72 42l106-42q18-6 26 8l86 148q10 18-4 28l-90 70q2 14 2 42t-2 42z"></path>
					</svg>
				</button>
			</div>
			<div className="account-container4">
				<AdminSideBar />
			</div>
		</div>
	);
};

export default Account;
