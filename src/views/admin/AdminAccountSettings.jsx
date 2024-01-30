import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaDisplayText from '../../components/Forms/LamparaDisplayText';
import LamparaButton from '../../components/Button/LamparaButton';
import { UpdateAdminPassword } from '../../services/auth.services';
import notify from '../../components/Notification/notify';

const AdminAccountSettings = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [matched, setMatched] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const toggleEditMode = () => {
		setSuccess(false);
		setEditMode(!editMode);
	};

	const savePassword = async () => {
		setLoading(true);

		if (matched) {
			const res = await UpdateAdminPassword({
				username: localStorage.getItem('adminUsername'),
				password: password,
			});

			if (res.data.success) {
				notify('Password updated successfully');
				setPassword('');
				setConfirmPassword('');
				toggleEditMode();
				setSuccess(true);
			}
		}

		setLoading(false);
	};

	const comparePassword = (password, confirm) => {
		if (password !== confirm) {
			setMatched(false);
		} else {
			setMatched(true);
		}
	};

	return (
		<div className="py-4 ">
			<HelmetProvider>
				<Helmet>
					<title>My Account - sked.io</title>
					<meta property="og:title" content="My Account - sked.io" />
				</Helmet>
			</HelmetProvider>
			<div className="flex gap-x-4 gap-y-4 px-4">
				<div className="flex flex-col lg:w-1/2 border-2 border-grey-600 p-6 rounded-md">
					<p className="font-semibold text-xl mb-6">Account Information</p>
					<LamparaDisplayText
						label={'Username'}
						value={localStorage.getItem('adminUsername')}
					/>
					<p className="font-semibold">New Password</p>
					<input
						className="text-sm h-8 px-2 border-2 mb-4"
						type="password"
						disabled={editMode ? false : true}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="font-semibold">Confirm New Password</p>
					<input
						className="text-sm h-8 px-2 border-2 "
						type="password"
						disabled={editMode ? false : true}
						required
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							comparePassword(password, e.target.value);
						}}
					/>
					{editMode && !matched && matched != null ? (
						<p className="text-red-500 text-xs">Passwords do not match</p>
					) : (
						''
					)}

					{success ? (
						<div className="flex justify-center">
							<p className="text-green-600 text-xs">
								Password updated successfully.
							</p>
						</div>
					) : null}

					{editMode ? (
						<div className="flex gap-x-2 justify-center">
							<LamparaButton
								loading={loading}
								loadingText={'Saving...'}
								onClick={() => savePassword()}
								width={'w-[150px]'}
								label={'Save'}
								bgColor="bg-green-700"
							/>
							<LamparaButton
								onClick={toggleEditMode}
								width={'w-[150px]'}
								label={'Cancel'}
								bgColor="bg-red-700"
							/>
						</div>
					) : (
						<div className="flex justify-center">
							<LamparaButton
								onClick={toggleEditMode}
								width={'w-[300px]'}
								label={'Change Password'}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminAccountSettings;
