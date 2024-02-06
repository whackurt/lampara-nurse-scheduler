import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LamparaTextButtonWithIcon from '../../components/Button/LamparaButtonWithIcon';
import LamparaIconButton from '../../components/Button/LamparaIconButton';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaButton from '../../components/Button/LamparaButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
	calculateHours,
	formatTime,
	getShiftType,
} from '../../helpers/shiftHelpers';
import { useShiftStore } from '../../stores/useShiftStore';

import Loader from '../../components/Loader/Loader';
import notify from '../../components/Notification/notify';
import { Toaster } from 'react-hot-toast';

const ManageShifts = () => {
	const getAllShifts = useShiftStore((state) => state.getAllShifts);
	const shifts = useShiftStore((state) => state.allShifts);
	const createShift = useShiftStore((state) => state.createShift);
	const updateShift = useShiftStore((state) => state.updateShift);
	const deleteShift = useShiftStore((state) => state.deleteShift);
	const createLoading = useShiftStore((state) => state.createLoading);
	const getLoading = useShiftStore((state) => state.getLoading);
	const updateLoading = useShiftStore((state) => state.updateLoading);
	const deleteLoading = useShiftStore((state) => state.deleteLoading);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [idToEdit, setIdToEdit] = useState(null);
	const [idToDelete, setIdToDelete] = useState(null);
	const [shiftToEdit, setShiftToEdit] = useState({
		start_time: new Date(),
		end_time: new Date(),
		shift_name: '',
	});

	const [newShift, setNewShift] = useState({
		shift_name: '',
		start_time: null,
		end_time: null,
	});

	// Time input handlers
	const onTimeInChange = async (time) => {
		const type = await getShiftType(time);

		setNewShift({
			...newShift,
			start_time: time,
			shift_name: type,
		});
	};

	const onTimeOutChange = (time) => {
		setNewShift({
			...newShift,
			end_time: time,
		});
	};

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

	// CRUD methods
	const createNewShift = async () => {
		if (Object.keys(newShift).length >= 3) {
			const res = await createShift(newShift);

			if (res.success) {
				notify('Shift created successfully');
				getAllShifts();
				toggleCreateModal();
				setNewShift({
					shift_name: '',
					start_time: null,
					end_time: null,
				});
			} else {
				notify('Failed to create new shift', true);
			}
		} else {
			notify('Please fill all the required information', true);
		}
	};

	const getUpdatedShiftType = async () => {
		var newType = await getShiftType(shiftToEdit.start_time);
		setShiftToEdit({
			...shiftToEdit,
			shift_name: newType,
		});
	};

	const saveChanges = async () => {
		const res = await updateShift(idToEdit, shiftToEdit);

		if (res.success) {
			notify('Shift updated successfully');
			getAllShifts();
			toggleEditModal();
		} else {
			notify('Failed to update shift.', true);
		}
	};

	const confirmDelete = async () => {
		const res = await deleteShift(idToDelete);

		if (res.success) {
			notify('Shift deleted successfully');
			getAllShifts();
			toggleDeleteModal();
		} else {
			notify('Failed to delete shift.', true);
		}
	};

	// use effect
	useEffect(() => {
		getAllShifts();
	}, []);

	useEffect(() => {
		getUpdatedShiftType();
	}, [shiftToEdit.start_time]);

	return (
		<div className="p-4">
			<HelmetProvider>
				<Helmet>
					<title>Manage Shifts - skedle</title>
					<meta property="og:title" content="Manage Shifts - skedle" />
				</Helmet>
			</HelmetProvider>
			<Toaster position="bottom-right" reverseOrder={true} />
			<CustomModal
				title={'Create Shift'}
				toggleModal={toggleCreateModal}
				showModal={showCreateModal}
			>
				<p className="text-xs mb-3">
					<span className="text-red-500">*</span> Indicates required field
				</p>
				<div className="flex gap-x-4">
					<div className="flex flex-col mt-3">
						<p className="font-light text-xs">
							Start Time<span className="text-red-500">*</span>
						</p>
						<div className="flex items-center border rounded-md p-1">
							<DatePicker
								className="text-sm"
								selected={newShift.start_time}
								onChange={onTimeInChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Start Time"
								dateFormat="hh:mm aa"
							/>
						</div>
					</div>
					<div className="flex flex-col mt-3">
						<p className="font-light text-xs">
							End Time <span className="text-red-500">*</span>
						</p>
						<div className="flex items-center border rounded-md p-1">
							<DatePicker
								className="text-sm"
								selected={newShift.end_time}
								onChange={onTimeOutChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="End Time"
								dateFormat="hh:mm aa"
							/>
						</div>
					</div>
				</div>
				<div className="flex mb-4">
					<div className="mt-3 w-[190px]">
						<p className="font-light text-xs">Shift Type</p>
						<p className="font-semibold text-primary">{`${newShift.shift_name} `}</p>
					</div>
					<div className="mt-3 h-10">
						<p className="font-light text-xs">No. of hours</p>
						<p className="font-semibold text-orange-600">
							{`${
								newShift.end_time !== null
									? calculateHours(newShift.start_time, newShift.end_time)
									: ''
							}`}
						</p>
					</div>
				</div>

				<LamparaTextButtonWithIcon
					label={'Create Shift'}
					bgColor="bg-green-600"
					loading={createLoading}
					loadingText={'Saving shift...'}
					icon={<IoIosAddCircleOutline size={25} />}
					onClick={createNewShift}
				/>
			</CustomModal>

			<CustomModal
				title={'Edit Shift'}
				toggleModal={toggleEditModal}
				showModal={showEditModal}
			>
				<div className="flex gap-x-4">
					<div className="flex flex-col mt-3">
						<p className="font-light text-xs">
							Start Time<span className="text-red-500">*</span>
						</p>
						<div className="flex items-center border rounded-md p-1">
							<DatePicker
								className="text-sm"
								selected={shiftToEdit.start_time}
								onChange={(time) =>
									setShiftToEdit({
										...shiftToEdit,
										start_time: time,
									})
								}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Start Time"
								dateFormat="hh:mm aa"
							/>
						</div>
					</div>
					<div className="flex flex-col mt-3">
						<p className="font-light text-xs">
							End Time <span className="text-red-500">*</span>
						</p>
						<div className="flex items-center border rounded-md p-1">
							<DatePicker
								className="text-sm"
								selected={shiftToEdit.end_time}
								onChange={(time) =>
									setShiftToEdit({
										...shiftToEdit,
										end_time: time,
									})
								}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="End Time"
								dateFormat="hh:mm aa"
							/>
						</div>
					</div>
				</div>
				<div className="flex">
					<div className="mt-3 w-[190px]">
						<p className="font-light text-xs">Shift Type</p>
						<p className="font-semibold text-primary">{`${shiftToEdit.shift_name} `}</p>
					</div>
					<div className="mt-3 h-10">
						<p className="font-light text-xs">No. of hours</p>
						<p className="font-semibold text-orange-600">
							{calculateHours(shiftToEdit.start_time, shiftToEdit.end_time)}
						</p>
					</div>
				</div>

				<LamparaTextButtonWithIcon
					label={'Save Changes'}
					bgColor="bg-yellow-600"
					loading={updateLoading}
					loadingText={'Saving changes...'}
					icon={<AiOutlineEdit size={25} />}
					onClick={saveChanges}
				/>
			</CustomModal>

			<CustomModal
				title={'Delete Shift'}
				toggleModal={toggleDeleteModal}
				showModal={showDeleteModal}
			>
				<p>Are you sure you want to delete this shift?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Delete'}
						loading={deleteLoading}
						loadingText={'Deleting shift...'}
						bgColor="bg-red-500"
						width={'w-24'}
						onClick={confirmDelete}
					/>
				</div>
			</CustomModal>
			<div className="flex justify-end">
				<LamparaTextButtonWithIcon
					label={'Create Shift'}
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
								Shift Type
							</th>
							<th scope="col" className="px-6 py-3">
								Start Time
							</th>
							<th scope="col" className="px-6 py-3">
								End Time
							</th>
							<th scope="col" className="px-6 py-3">
								Hour(s)
							</th>

							<th scope="col" className="px-6 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{shifts?.map((shift) => (
							<tr key={shift._id} className="border-b">
								<td
									className={`px-6 py-3 font-bold ${
										shift.shift_name === 'Day'
											? 'text-teal-600'
											: shift.shift_name === 'Evening'
											? 'text-purple-600'
											: 'text-orange-500'
									}`}
								>
									{shift.shift_name} Shift
								</td>
								<td className="px-6 py-3">
									{formatTime(new Date(shift.start_time))}
								</td>
								<td className="px-6 py-3">
									{formatTime(new Date(shift.end_time))}
								</td>
								<td className="px-6 py-3">
									{calculateHours(
										new Date(shift.start_time),
										new Date(shift.end_time)
									)}
								</td>
								<td className="px-6 py-3">
									<div className="flex gap-x-1 cursor-pointer">
										<LamparaIconButton
											icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
											color="bg-yellow-600"
											onClick={() => {
												toggleEditModal();
												setIdToEdit(shift._id);
												setShiftToEdit({
													...shiftToEdit,
													start_time: new Date(shift.start_time),
													end_time: new Date(shift.end_time),
													shift_name: shift.shift_name,
												});
											}}
										/>
										<LamparaIconButton
											icon={<AiOutlineDelete size={20} color="#FFFFFF" />}
											color="bg-red-500"
											onClick={() => {
												toggleDeleteModal();
												setIdToDelete(shift._id);
											}}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{shifts.length === 0 && !getLoading && (
					<div className="flex justify-center">
						<p className="text-sm">No shifts found. Please create.</p>
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

export default ManageShifts;
