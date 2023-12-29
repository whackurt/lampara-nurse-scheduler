import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaDisplayText from '../../components/Forms/LamparaDisplayText';
import LamparaButton from '../../components/Button/LamparaButton';
import { GetNurseById } from '../../services/nurse.services';
import { UpdateNursePassword } from '../../services/auth.services';

const NurseAccountSettings = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [matched, setMatched] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [nurse, setNurse] = useState(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const savePassword = async () => {
		setSuccess(false);
		setLoading(true);

		if (matched) {
			const res = await UpdateNursePassword({
				username: nurse?.username,
				password: password,
			});

			if (res.data?.success) {
				setSuccess(true);
				setPassword('');
				setConfirmPassword('');
				setEditMode(false);
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

	const getNurseDetails = async () => {
		const res = await GetNurseById(localStorage.getItem('nurseId'));

		if (res.success) {
			setNurse(res.data);
		}
	};

	useEffect(() => {
		getNurseDetails();
	}, []);

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>My Account - Lampara</title>
					<meta property="og:title" content="Schedule-Nurses - Lampara" />
				</Helmet>
			</HelmetProvider>
			<div className="flex gap-x-4 gap-y-4 px-4">
				<div className="flex flex-col w-1/2 border-2 border-grey-600 p-6 rounded-md">
					<p className="font-semibold text-xl mb-6">Profile Information</p>
					<LamparaDisplayText label={'First Name'} value={nurse?.first_name} />
					<LamparaDisplayText label={'Last Name'} value={nurse?.last_name} />
					<LamparaDisplayText
						label={'Department'}
						value={nurse?.department.name}
					/>
					<LamparaDisplayText label={'Email'} value={nurse?.email} />
				</div>
				<div className="flex flex-col w-1/2 border-2 border-grey-600 p-6 rounded-md">
					<p className="font-semibold text-xl mb-6">Account Information</p>
					<LamparaDisplayText label={'Username'} value={nurse?.username} />

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
						<div className="lg:flex gap-x-2 justify-center">
							<LamparaButton
								onClick={() => savePassword()}
								width={'w-[150px]'}
								label={'Save'}
								loading={loading}
								loadingText={'Saving...'}
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

export default NurseAccountSettings;
