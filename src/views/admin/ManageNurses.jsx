import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoMdSearch } from 'react-icons/io';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaButton from '../../components/Button/LamparaButton';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import LamparaDropdown from '../../components/Button/LamparaDropdown';
import {
	CreateNurse,
	DeleteNurseById,
	GetAllNurses,
	UpdateNurseById,
} from '../../services/nurse.services';
import { GetAllDepartments } from '../../services/department.services';
import toast, { Toaster } from 'react-hot-toast';
import { CreateChat } from '../../services/chat.services';
import Loader from '../../components/Loader/Loader';
import { AiOutlineDelete } from 'react-icons/ai';
import { restructureDepartments } from '../../helpers/restructure';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoSaveOutline } from 'react-icons/io5';
import LamparaIconButton from '../../components/Button/LamparaIconButton';

const ManageNurses = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [newNurse, setNewNurse] = useState({});
	const [nurseToUpdate, setNurseToUpdate] = useState(null);
	const [updates, setUpdates] = useState({});

	const [nurses, setNurses] = useState([]);
	const [filteredNurses, setFilteredNurses] = useState([]);
	const [departmentList, setDepartmentList] = useState([]);

	const [loading, setLoading] = useState(false);

	const [idToUpdate, setIdToUpdate] = useState(null);
	const [idToDelete, setIdToDelete] = useState(null);

	const [keyword, setKeyword] = useState('');

	const userId = localStorage.getItem('userId');

	const notify = (message) => {
		toast.success(message, { duration: 5000 });
	};

	const toggleAddModal = () => {
		setShowAddModal(!showAddModal);
	};

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const addNurse = async () => {
		setLoading(true);
		const res = await CreateNurse(newNurse);

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
				getAllNurses();
				toggleAddModal();
			}
		} else {
			notify('Failed to create chat.', true);
		}

		setLoading(false);
	};

	const updateNurse = async () => {
		setLoading(true);

		if (Object.keys(updates).length !== 0) {
			const res = await UpdateNurseById(idToUpdate, updates);
			if (res.success) {
				notify('Nurse updated successfully.');
				getAllNurses();
				toggleUpdateModal();
			} else {
				notify('Failed to update nurse.', true);
			}
		}

		setLoading(false);
	};

	const getAllNurses = async () => {
		setLoading(true);

		const res = await GetAllNurses();
		if (res.success) {
			const fetchedNurses = res.data;
			setNurses(fetchedNurses);
		} else {
			notify('Failed to fetch nurses.', true);
		}

		setLoading(false);
	};

	const getAllDepartments = async () => {
		const res = await GetAllDepartments();

		const fetchedDepts = res.data;
		var restructured = restructureDepartments(fetchedDepts);

		setDepartmentList(restructured);
	};

	const deleteNurse = async (id) => {
		setLoading(true);

		const res = await DeleteNurseById(id);
		if (res.success) {
			notify('Nurse deleted successfully.');
			getAllNurses();
		} else {
			notify('Failed to delete nurse.', true);
		}

		toggleDeleteModal();
		setLoading(false);
	};

	const searchNurse = () => {
		const filteredNurses = nurses.filter(
			(nurse) =>
				nurse.first_name.toLowerCase().includes(keyword.toLowerCase()) ||
				nurse.last_name.toLowerCase().includes(keyword.toLowerCase())
		);
		setFilteredNurses(filteredNurses);
	};

	useEffect(() => {
		var toUpdate = nurses.filter((nurse) => nurse._id === idToUpdate);
		setNurseToUpdate(toUpdate);
	}, [idToUpdate]);

	useEffect(() => {
		getAllNurses();
		getAllDepartments();
	}, []);

	useEffect(() => {
		searchNurse();
	}, [keyword]);

	return (
		<div className="p-4">
			<HelmetProvider>
				<Helmet>
					<title>Manage Nurses - sked.io</title>
					<meta property="og:title" content="Manage Nurses - sked.io" />
				</Helmet>
			</HelmetProvider>

			<Toaster position="top-center" reverseOrder={true} />

			<CustomModal
				title={'Add Nurse'}
				toggleModal={toggleAddModal}
				showModal={showAddModal}
			>
				<p className="text-xs mb-3">
					<span className="text-red-500">*</span> Indicates required field
				</p>

				<LamparaDropdown
					label={'Department'}
					placeholder={'Select department'}
					options={departmentList}
					onChange={(option) =>
						setNewNurse({ ...newNurse, department: option.value })
					}
				/>
				<LamparaInputForm
					label={'First Name'}
					onChange={(e) =>
						setNewNurse({ ...newNurse, first_name: e.target.value })
					}
				/>

				<LamparaInputForm
					label={'Last Name'}
					onChange={(e) =>
						setNewNurse({ ...newNurse, last_name: e.target.value })
					}
				/>
				<LamparaInputForm
					type="email"
					label={'Email Address'}
					onChange={(e) => setNewNurse({ ...newNurse, email: e.target.value })}
				/>
				<LamparaInputForm
					label={'Username'}
					onChange={(e) =>
						setNewNurse({ ...newNurse, username: e.target.value })
					}
				/>
				<LamparaInputForm
					label={'Password'}
					onChange={(e) =>
						setNewNurse({ ...newNurse, password: e.target.value })
					}
				/>
				<LamparaTextButtonWithIcon
					loading={loading}
					loadingText={'Adding nurse...'}
					icon={<IoIosAddCircleOutline size={25} />}
					bgColor="bg-green-600"
					onClick={() => addNurse()}
					label={'Add Nurse'}
				/>
			</CustomModal>

			<CustomModal
				title={'Update Nurse'}
				toggleModal={toggleUpdateModal}
				showModal={showUpdateModal}
			>
				<LamparaDropdown
					required={false}
					label={'Department'}
					placeholder={'Select department'}
					options={departmentList}
					onChange={(option) =>
						setUpdates({ ...updates, department: option.value })
					}
				/>
				<LamparaInputForm
					required={false}
					label={'First Name'}
					placeholder={nurseToUpdate && nurseToUpdate[0]?.first_name}
					onChange={(e) =>
						setUpdates({ ...updates, first_name: e.target.value })
					}
				/>
				<LamparaInputForm
					label={'Last Name'}
					required={false}
					placeholder={nurseToUpdate && nurseToUpdate[0]?.last_name}
					onChange={(e) =>
						setUpdates({ ...updates, last_name: e.target.value })
					}
				/>
				<LamparaInputForm
					label={'Email'}
					required={false}
					placeholder={nurseToUpdate && nurseToUpdate[0]?.email}
					onChange={(e) =>
						setUpdates({ ...updates, last_name: e.target.value })
					}
				/>
				<LamparaInputForm
					label={'Username'}
					required={false}
					placeholder={nurseToUpdate && nurseToUpdate[0]?.username}
					onChange={(e) => setUpdates({ ...updates, username: e.target.value })}
				/>
				<LamparaTextButtonWithIcon
					loading={loading}
					loadingText={'Updating nurse...'}
					icon={<IoSaveOutline size={20} />}
					onClick={() => updateNurse()}
					label={'Save Update'}
				/>
			</CustomModal>

			<CustomModal
				title={'Delete Schedule'}
				showModal={showDeleteModal}
				toggleModal={toggleDeleteModal}
			>
				<p>Are you sure you want to delete nurse?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Delete'}
						loading={loading}
						loadingText={'Deleting...'}
						bgColor="bg-red-500"
						width={'w-[100px]'}
						onClick={() => deleteNurse(idToDelete)}
					/>
				</div>
			</CustomModal>
			<div className="flex justify-between">
				<div className="flex justify-end gap-x-2 items-center">
					<input
						className="px-2 relative h-8 rounded-lg w-64 border-2 text-sm"
						type="text"
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="Search nurse"
					/>
					<button
						// onClick={() => searchPersonnel()}
						className="absolute px-2 py-2 rounded-lg"
					>
						<IoMdSearch color="#24234d" />
					</button>
				</div>
				<LamparaTextButtonWithIcon
					label={'Add Nurse'}
					bgColor="bg-green-600"
					icon={<IoIosAddCircleOutline size={25} />}
					onClick={toggleAddModal}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className=" w-full my-4 text-sm border  rounded-md text-left rtl:text-right text-gray-600">
					{loading ? (
						<Loader />
					) : (
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
															className="flex w-28 text-white justify-center px-2 rounded-sm"
														>
															{nurse.department?.name}
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
															color={'bg-blue-500'}
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
									: nurses?.map((nurse) => (
											<tr key={nurse._id} className="border-b">
												<td className={`px-6 py-3`}>
													<div>
														<div
															style={{
																backgroundColor: `${nurse.department?.color}`,
															}}
															className="flex w-28 text-white justify-center px-2 rounded-sm"
														>
															{nurse.department?.name}
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
															color={'bg-blue-500'}
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
					)}
				</table>
			</div>
		</div>
	);
};

export default ManageNurses;
