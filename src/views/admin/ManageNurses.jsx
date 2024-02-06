import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaButton from '../../components/Button/LamparaButton';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import LamparaDropdown from '../../components/Button/LamparaDropdown';
import { GetAllDepartments } from '../../services/department.services';
import { Toaster } from 'react-hot-toast';
import { CreateChat } from '../../services/chat.services';
import Loader from '../../components/Loader/Loader';
import { restructureDepartments } from '../../helpers/restructure';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoSaveOutline } from 'react-icons/io5';
import LamparaIconButton from '../../components/Button/LamparaIconButton';
import notify from '../../components/Notification/notify';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNurseStore } from '../../stores/useNurseStore';

const ManageNurses = () => {
	const _nurses = useNurseStore((state) => state.allNurses);
	const _getLoading = useNurseStore((state) => state.getLoading);
	const _createLoading = useNurseStore((state) => state.createLoading);
	const _updateLoading = useNurseStore((state) => state.updateLoading);
	const _deleteLoading = useNurseStore((state) => state.deleteLoading);
	// const nurseToUpdate = useNurseStore((state) => state.nurseToUpdate);
	// const nurseUpdateData = useNurseStore((state) => state.nurseUpdateData);

	const getAllNurses = useNurseStore((state) => state.getAllNurses);
	const createNurse = useNurseStore((state) => state.createNurse);
	const updateNurse = useNurseStore((state) => state.updateNurseById);
	const deleteNurse = useNurseStore((state) => state.deleteNurseById);
	// const setNurseToUpdate = useNurseStore((state) => state.setNurseToUpdate);
	// const setNurseUpdates = useNurseStore((state) => state.setNurseToUpdate);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [nurseToUpdate, setNurseToUpdate] = useState(null);
	const [updates, setUpdates] = useState({});

	const [filteredNurses, setFilteredNurses] = useState([]);
	const [departmentList, setDepartmentList] = useState([]);

	const [department, setDepartment] = useState('');

	const [idToUpdate, setIdToUpdate] = useState(null);
	const [idToDelete, setIdToDelete] = useState(null);

	const [keyword, setKeyword] = useState('');

	const userId = localStorage.getItem('adminUserId');

	const toggleAddModal = () => {
		setShowAddModal(!showAddModal);
	};

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	// ADD NURSE
	const addNurseValidationSchema = yup
		.object({
			first_name: yup.string().required('First Name is required'),
			last_name: yup.string().required('Last Name is required'),
			email: yup
				.string()
				.required('Email address is required')
				.email('Invalid email address'),
			username: yup.string().required('Username is required'),
			password: yup
				.string()
				.required('Password is required')
				.min(8, 'Password must be at least 8 characters'),
		})
		.required();

	const {
		register: addRegister,
		handleSubmit: handleAddNurse,
		reset: addReset,
		formState: { errors: addErrors },
	} = useForm({
		resolver: yupResolver(addNurseValidationSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			username: '',
			password: '',
		},
	});

	const onAddNurse = async (data) => {
		if (department !== '') {
			data = {
				...data,
				department: department,
			};

			const res = await createNurse(data);

			if (res.success) {
				const createChatRes = await CreateChat(
					{
						chatName: 'chat',
						isGroupChat: false,
						copyOf: [userId, res.data?.nurseUserId],
						users: [userId, res.data?.nurseUserId],
					},
					'admin'
				);

				if (createChatRes.status == 201) {
					notify('Nurse added successfully.');
					addReset();
					getAllNurses();
					toggleAddModal();
				}
			} else {
				if (
					String(res?.error.response.data.message).substring(0, 6) === 'E11000'
				) {
					notify('Email address is already taken', true);
				} else {
					notify('An error occurred.', true);
				}
			}
		}
	};

	// UPDATE NURSE
	const {
		register: updateRegister,
		handleSubmit: handleUpdateNurse,
		reset: updateReset,
		formState: { errors: updateErrors },
	} = useForm({
		defaultValues: {
			first_name: nurseToUpdate && nurseToUpdate[0]?.first_name,
			last_name: nurseToUpdate && nurseToUpdate[0]?.last_name,
			email: nurseToUpdate && nurseToUpdate[0]?.email,
			username: nurseToUpdate && nurseToUpdate[0]?.username,
		},
	});

	const onUpdateNurse = async (data) => {
		data = {
			...data,
			department: updates && updates.department,
		};

		const res = await updateNurse(idToUpdate, data);

		if (res.success) {
			notify('Nurse updated successfully.');
			getAllNurses();
			toggleUpdateModal();
			updateReset();
		} else {
			notify('Failed to update nurse.', true);
		}
	};

	const getAllDepartments = async () => {
		const res = await GetAllDepartments();

		const fetchedDepts = res.data;
		var restructured = restructureDepartments(fetchedDepts);

		setDepartmentList(restructured);
	};

	const _deleteNurse = async (id) => {
		const res = await deleteNurse(id);

		if (res.success) {
			notify('Nurse deleted successfully.');
			getAllNurses();
		} else {
			notify('Failed to delete nurse.', true);
		}

		toggleDeleteModal();
	};

	const searchNurse = () => {
		const filteredNurses = _nurses.filter(
			(nurse) =>
				nurse.first_name.toLowerCase().includes(keyword.toLowerCase()) ||
				nurse.last_name.toLowerCase().includes(keyword.toLowerCase())
		);
		setFilteredNurses(filteredNurses);
	};

	useEffect(() => {
		var toUpdate = _nurses.filter((nurse) => nurse._id === idToUpdate);
		setNurseToUpdate(toUpdate);
	}, [idToUpdate]);

	useEffect(() => {
		getAllDepartments();
	}, []);

	useEffect(() => {
		getAllNurses();
	}, []);

	useEffect(() => {
		searchNurse();
	}, [keyword]);

	return (
		<div className="p-4">
			<HelmetProvider>
				<Helmet>
					<title>Manage Nurses - skedle</title>
					<meta property="og:title" content="Manage Nurses - skedle" />
				</Helmet>
			</HelmetProvider>

			<Toaster position="bottom-right" reverseOrder={true} />

			<CustomModal
				title={'Add Nurse'}
				toggleModal={toggleAddModal}
				showModal={showAddModal}
			>
				<form onSubmit={handleAddNurse(onAddNurse)}>
					<p className="text-xs mb-3">
						<span className="text-red-500">*</span> Indicates required field
					</p>

					<LamparaDropdown
						label={'Department'}
						placeholder={'Select department'}
						options={departmentList}
						onChange={(option) => setDepartment(option.value)}
						errorMsg={department === '' && 'Department is required'}
					/>
					<LamparaInputForm
						label={'First Name'}
						name={'first_name'}
						register={addRegister}
						errorMsg={addErrors && addErrors.first_name?.message}
					/>

					<LamparaInputForm
						label={'Last Name'}
						name={'last_name'}
						register={addRegister}
						errorMsg={addErrors && addErrors.last_name?.message}
					/>
					<LamparaInputForm
						label={'Email Address'}
						name={'email'}
						register={addRegister}
						errorMsg={addErrors && addErrors.email?.message}
					/>
					<LamparaInputForm
						label={'Username'}
						name={'username'}
						register={addRegister}
						errorMsg={addErrors && addErrors.username?.message}
					/>
					<LamparaInputForm
						label={'Password'}
						name={'password'}
						register={addRegister}
						errorMsg={addErrors && addErrors.password?.message}
					/>
					<LamparaTextButtonWithIcon
						loading={_createLoading}
						loadingText={'Adding nurse...'}
						icon={<IoIosAddCircleOutline size={25} />}
						bgColor="bg-green-600"
						width={'w-full'}
						label={'Add Nurse'}
						type={'submit'}
					/>
				</form>
			</CustomModal>

			<CustomModal
				title={'Update Nurse'}
				toggleModal={toggleUpdateModal}
				showModal={showUpdateModal}
			>
				<form action="" onSubmit={handleUpdateNurse(onUpdateNurse)}>
					<LamparaDropdown
						required={false}
						label={'Department'}
						placeholder={nurseToUpdate && nurseToUpdate[0]?.department?.name}
						options={departmentList}
						// value={nurseToUpdate && nurseToUpdate[0]?.department.name}
						onChange={(option) =>
							setUpdates({ ...updates, department: option.value })
						}
					/>
					<LamparaInputForm
						required={false}
						label={'First Name'}
						name={'first_name'}
						register={updateRegister}
						placeholder={nurseToUpdate && nurseToUpdate[0]?.first_name}
					/>
					<LamparaInputForm
						label={'Last Name'}
						required={false}
						name={'last_name'}
						register={updateRegister}
						placeholder={nurseToUpdate && nurseToUpdate[0]?.last_name}
					/>
					<LamparaInputForm
						label={'Email'}
						required={false}
						name={'email'}
						register={updateRegister}
						placeholder={nurseToUpdate && nurseToUpdate[0]?.email}
					/>
					<LamparaInputForm
						label={'Username'}
						required={false}
						name={'username'}
						register={updateRegister}
						placeholder={nurseToUpdate && nurseToUpdate[0]?.username}
					/>
					<LamparaTextButtonWithIcon
						loading={_updateLoading}
						loadingText={'Updating nurse...'}
						icon={<IoSaveOutline size={20} />}
						type={'submit'}
						width={'w-full'}
						label={'Save Update'}
					/>
				</form>
			</CustomModal>

			<CustomModal
				title={'Delete Nurse'}
				showModal={showDeleteModal}
				toggleModal={toggleDeleteModal}
			>
				<p>Are you sure you want to delete nurse?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Delete'}
						loading={_deleteLoading}
						loadingText={'Deleting...'}
						bgColor="bg-red-500"
						width={'w-[100px]'}
						onClick={() => _deleteNurse(idToDelete)}
					/>
				</div>
			</CustomModal>
			<div className="flex justify-between items-center">
				<div className="flex justify-end gap-x-2 items-center">
					<input
						className="px-2 relative mt-4 h-8 rounded-lg w-64 border-2 text-sm"
						type="text"
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="Search nurse"
					/>
				</div>
				<LamparaTextButtonWithIcon
					label={'Add Nurse'}
					bgColor="bg-green-600"
					icon={<IoIosAddCircleOutline size={25} />}
					onClick={toggleAddModal}
				/>
			</div>
			<div className="overflow-x-auto">
				{_getLoading ? (
					<Loader />
				) : (
					<table className="w-full my-4 text-sm border text-left rtl:text-right text-gray-600">
						<>
							<thead className="text-xs bg-primary text-white uppercase ">
								<tr>
									<th scope="col" className="px-6 py-3">
										Department
									</th>
									<th scope="col" className="px-6 py-3">
										Last Name
									</th>
									<th scope="col" className="px-6 py-3">
										First Name
									</th>

									<th scope="col" className="px-6 py-3">
										Email Address
									</th>
									<th scope="col" className="px-6 py-3">
										Username
									</th>

									<th scope="col" className="px-6 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{keyword.length > 0
									? filteredNurses?.map((nurse) => (
											<tr key={nurse._id} className="border-b">
												<td className={`px-6 py-3`}>
													<div>
														<div
															style={{
																backgroundColor: `${nurse.department?.color}`,
															}}
															className="flex w-28 text-white justify-center px-2 rounded-full"
														>
															{nurse.department?.name ? (
																<p>{nurse.department?.name}</p>
															) : (
																<p className="text-red-600 font-semibold">
																	Unassigned
																</p>
															)}
														</div>
													</div>
												</td>
												<td className="px-6 py-3">{nurse.last_name}</td>
												<td className="px-6 py-3">{nurse.first_name}</td>

												<td className="px-6 py-3">{nurse.email}</td>
												<td className="px-6 py-3">{nurse.username}</td>
												<td className="px-6 py-3">
													<div className="flex gap-x-1 cursor-pointer">
														<LamparaIconButton
															onClick={() => {
																setIdToUpdate(nurse._id);
																toggleUpdateModal();
															}}
															color={'bg-yellow-600'}
															icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
														/>
														<LamparaIconButton
															onClick={() => {
																setIdToDelete(nurse._id);
																toggleDeleteModal();
															}}
															color={'bg-red-500'}
															icon={
																<AiOutlineDelete size={20} color="#FFFFFF" />
															}
														/>
													</div>
												</td>
											</tr>
									  ))
									: _nurses?.map((nurse) => (
											<tr key={nurse._id} className="border-b">
												<td className={`px-6 py-3`}>
													<div>
														<div
															style={{
																backgroundColor: `${nurse.department?.color}`,
															}}
															className="flex w-28 text-white justify-center px-2 rounded-full"
														>
															{nurse.department?.name ? (
																<p>{nurse.department?.name}</p>
															) : (
																<p className="text-red-600">Unassigned</p>
															)}
														</div>
													</div>
												</td>
												<td className="px-6 py-3">{nurse.last_name}</td>
												<td className="px-6 py-3">{nurse.first_name}</td>

												<td className="px-6 py-3">{nurse.email}</td>
												<td className="px-6 py-3">{nurse.username}</td>
												<td className="px-6 py-3">
													<div className="flex gap-x-1 cursor-pointer">
														<LamparaIconButton
															onClick={() => {
																setIdToUpdate(nurse._id);
																toggleUpdateModal();
															}}
															color={'bg-yellow-600'}
															icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
														/>
														<LamparaIconButton
															onClick={() => {
																setIdToDelete(nurse._id);
																toggleDeleteModal();
															}}
															color={'bg-red-500'}
															icon={
																<AiOutlineDelete size={20} color="#FFFFFF" />
															}
														/>
													</div>
												</td>
											</tr>
									  ))}
							</tbody>
						</>
					</table>
				)}
			</div>
		</div>
	);
};

export default ManageNurses;
