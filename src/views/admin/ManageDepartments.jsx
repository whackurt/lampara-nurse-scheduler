import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import LamparaIconButton from '../../components/Button/LamparaIconButton';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaButton from '../../components/Button/LamparaButton';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../../components/Loader/Loader';
import notify from '../../components/Notification/notify';
import { useDepartmentStore } from '../../stores/useDepartmentStore';
import LamparaInputForm from '../../components/Forms/LamparaInputForm';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SwatchesPicker } from 'react-color';
import LamparaBasicInput from '../../components/Forms/LamparaBasicInput';
import { Toaster } from 'react-hot-toast';

const ManageDepartments = () => {
	const departments = useDepartmentStore((state) => state.allDepartments);
	const getAllDepartments = useDepartmentStore(
		(state) => state.getAllDepartments
	);
	const createDepartment = useDepartmentStore(
		(state) => state.createDepartment
	);
	const updateDepartment = useDepartmentStore(
		(state) => state.updateDepartment
	);
	const deleteDepartment = useDepartmentStore(
		(state) => state.deleteDepartment
	);

	const getLoading = useDepartmentStore((state) => state.getLoading);
	const createLoading = useDepartmentStore((state) => state.createLoading);
	const editLoading = useDepartmentStore((state) => state.editLoading);
	const deleteLoading = useDepartmentStore((state) => state.deleteLoading);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [idToEdit, setIdToEdit] = useState(null);
	const [idToDelete, setIdToDelete] = useState(null);

	const [updatedDepartment, setUpdatedDepartment] = useState({});
	const [departmentToEdit, setDepartmentToEdit] = useState({
		name: null,
		color: null,
	});

	const [keyword, setKeyword] = useState('');
	const [filteredDepts, setFilteredDepts] = useState('');

	const [hexColor, setHexColor] = useState('');
	const [noColorSelected, setNoColorSelected] = useState(false);

	// Modal operations
	const toggleCreateModal = () => {
		setShowCreateModal(!showCreateModal);
	};

	const toggleEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	// Color picker handler
	const handleColorPicker = (color) => {
		setHexColor(color.hex);
		setNoColorSelected(false);
		if (showEditModal) {
			setUpdatedDepartment({
				...updatedDepartment,
				color: color.hex,
			});
		}
	};

	// CRUD methods
	// CREATE DEPARTMENT
	const createDeptValidationSchema = yup
		.object({
			name: yup.string().required('Department Name is required'),
		})
		.required();

	const {
		register: createRegister,
		handleSubmit: handleCreateDept,
		reset: createReset,
		formState: { errors: createErrors },
	} = useForm({
		resolver: yupResolver(createDeptValidationSchema),
		defaultValues: {
			name: '',
		},
	});

	const onCreateDepartment = async (data) => {
		data = {
			...data,
			color: hexColor,
		};

		if (hexColor !== '') {
			const res = await createDepartment(data);

			if (res.success) {
				notify('Department created successfully');
				getAllDepartments();
				createReset();
				setHexColor('');
				toggleCreateModal();
			} else {
				notify('Failed to create department', true);
			}
		} else {
			setNoColorSelected(true);
		}
	};

	// EDIT DEPARTMENT
	const saveChanges = async () => {
		if (Object.keys(updatedDepartment).length > 0) {
			const res = await updateDepartment(idToEdit, updatedDepartment);

			if (res.success) {
				notify('Department updated successfully');
				getAllDepartments();
				setHexColor('');
				setUpdatedDepartment({});
				toggleEditModal();
			} else {
				notify('Failed to update department', true);
			}
		}
	};

	const confirmDelete = async () => {
		const res = await deleteDepartment(idToDelete);

		if (res.success) {
			notify('Department deleted successfully');
			getAllDepartments();
			toggleDeleteModal();
		} else {
			notify('Failed to delete department.', true);
		}
	};

	// Search department
	const searchDept = (keyword) => {
		const filteredDepts = departments.filter((dept) =>
			dept.name.toLowerCase().includes(keyword.toLowerCase())
		);

		setFilteredDepts(filteredDepts);
	};

	// use effect
	useEffect(() => {
		getAllDepartments();
	}, []);

	useEffect(() => {
		setHexColor(departmentToEdit.color);
	}, [idToEdit]);

	useEffect(() => {
		searchDept(keyword);
		console.log(filteredDepts);
	}, [keyword]);

	return (
		<div className="p-4">
			<HelmetProvider>
				<Helmet>
					<title>Manage Departments - skedle</title>
					<meta property="og:title" content="Manage Departments - skedle" />
				</Helmet>
			</HelmetProvider>

			<Toaster position="bottom-right" reverseOrder={true} />

			{/* Create Department */}
			<CustomModal
				title={'Create Department'}
				toggleModal={toggleCreateModal}
				showModal={showCreateModal}
			>
				<p className="text-xs mb-3">
					<span className="text-red-500">*</span> Indicates required field
				</p>
				<form action="" onSubmit={handleCreateDept(onCreateDepartment)}>
					<LamparaInputForm
						label={'Department Name'}
						name={'name'}
						register={createRegister}
						errorMsg={createErrors && createErrors.name?.message}
					/>
					<p className="font-light text-xs">
						Color Code<span className="text-red-500">*</span>
					</p>
					<div className="flex rounded-md border h-8 items-center px-2 gap-x-2">
						<div
							style={{ backgroundColor: `${hexColor}` }}
							className="w-8 h-4 "
						></div>
						<p className="text-sm">{hexColor}</p>
					</div>
					<p className="text-xs text-red-500 mb-1">
						{noColorSelected && 'Color is required.'}
					</p>
					<div className="flex justify-center mt-4">
						<SwatchesPicker onChange={handleColorPicker} />
					</div>

					<LamparaTextButtonWithIcon
						label={'Create Department'}
						loading={createLoading}
						loadingText={'Saving department...'}
						bgColor="bg-green-600"
						icon={<IoIosAddCircleOutline size={25} />}
						width={'w-full'}
						type={'submit'}
					/>
				</form>
			</CustomModal>

			{/* Edit Shift */}
			<CustomModal
				title={'Edit Department'}
				toggleModal={toggleEditModal}
				showModal={showEditModal}
			>
				<LamparaBasicInput
					label={'Department Name'}
					required={false}
					placeholder={departmentToEdit?.name}
					onChange={(e) =>
						setUpdatedDepartment({
							...updatedDepartment,
							name: e.target.value,
						})
					}
				/>
				<p className="font-light text-xs">Color Code</p>
				<div className="flex rounded-md border h-8 items-center px-2 gap-x-2">
					<div
						style={{ backgroundColor: `${hexColor}` }}
						className="w-8 h-4 "
					></div>
					<p className="text-sm">{hexColor}</p>
				</div>
				<div className="flex justify-center mt-4">
					<SwatchesPicker onChange={handleColorPicker} />
				</div>

				<LamparaTextButtonWithIcon
					label={'Save Changes'}
					loading={editLoading}
					loadingText={'Saving changes...'}
					bgColor="bg-yellow-600"
					icon={<AiOutlineEdit size={25} />}
					width={'w-full'}
					onClick={() => saveChanges()}
				/>
			</CustomModal>

			{/* Delete department */}
			<CustomModal
				title={'Delete Department'}
				toggleModal={toggleDeleteModal}
				showModal={showDeleteModal}
			>
				<p>Are you sure you want to delete this department?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Delete'}
						loading={deleteLoading}
						loadingText={'Deleting department...'}
						bgColor="bg-red-500"
						width={'w-24'}
						onClick={confirmDelete}
					/>
				</div>
			</CustomModal>

			{/* Create Department Button */}
			<div className="flex justify-between items-center">
				<div className="flex justify-end gap-x-2 items-center">
					<input
						className="px-2 relative mt-4 h-8 rounded-lg w-64 border-2 text-sm"
						type="text"
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="Search department"
					/>
				</div>
				<LamparaTextButtonWithIcon
					label={'Create Department'}
					bgColor="bg-green-600"
					icon={<IoIosAddCircleOutline size={25} />}
					onClick={toggleCreateModal}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full my-4 text-sm border text-left rtl:text-right text-gray-600">
					<thead className="text-xs bg-primary text-white uppercase ">
						<tr>
							<th scope="col" className="px-6 py-3">
								Department Name
							</th>
							<th scope="col" className="px-6 py-3">
								Color Code
							</th>

							<th scope="col" className="px-6 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{keyword.length > 0
							? filteredDepts?.map((dept) => {
									return (
										<tr key={dept._id} className="border-b">
											<td className="px-6 py-3">{dept.name}</td>
											<td className={`px-6 py-3`}>
												<div
													className={`flex justify-center w-20 rounded-full text-white`}
													style={{ backgroundColor: `${dept.color}` }}
												>
													{dept.color}
												</div>
											</td>
											<td className="px-6 py-3">
												<div className="flex gap-x-1 cursor-pointer">
													<LamparaIconButton
														icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
														color="bg-yellow-600"
														onClick={() => {
															toggleEditModal();
															setIdToEdit(dept._id);
															setDepartmentToEdit({
																name: dept.name,
																color: dept.color,
															});
														}}
													/>
													<LamparaIconButton
														icon={<AiOutlineDelete size={20} color="#FFFFFF" />}
														color="bg-red-500"
														onClick={() => {
															toggleDeleteModal();
															setIdToDelete(dept._id);
														}}
													/>
												</div>
											</td>
										</tr>
									);
							  })
							: departments?.map((dept) => {
									return (
										<tr key={dept._id} className="border-b">
											<td className="px-6 py-3">{dept.name}</td>
											<td className={`px-6 py-3`}>
												<div
													className={`flex justify-center w-20 rounded-full text-white`}
													style={{ backgroundColor: `${dept.color}` }}
												>
													{dept.color}
												</div>
											</td>
											<td className="px-6 py-3">
												<div className="flex gap-x-1 cursor-pointer">
													<LamparaIconButton
														icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
														color="bg-yellow-600"
														onClick={() => {
															toggleEditModal();
															setIdToEdit(dept._id);
															setDepartmentToEdit({
																name: dept.name,
																color: dept.color,
															});
														}}
													/>
													<LamparaIconButton
														icon={<AiOutlineDelete size={20} color="#FFFFFF" />}
														color="bg-red-500"
														onClick={() => {
															toggleDeleteModal();
															setIdToDelete(dept._id);
														}}
													/>
												</div>
											</td>
										</tr>
									);
							  })}
					</tbody>
				</table>
				{departments.length === 0 && !getLoading && (
					<div className="flex justify-center">
						<p className="text-sm">No departments found. Please create.</p>
					</div>
				)}
				{getLoading && (
					<div className="flex justify-center">
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageDepartments;
