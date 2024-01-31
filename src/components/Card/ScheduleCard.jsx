import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import CustomModal from '../Modal/CustomModal';
import LamparaButton from '../Button/LamparaButton';
import {
	DeleteScheduleById,
	UpdateScheduleById,
} from '../../services/schedule.services';
import LamparaDropdown from '../Button/LamparaDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import notify from '../Notification/notify';
import Loader from '../Loader/Loader';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import LamparaIconButton from '../Button/LamparaIconButton';

const ScheduleCard = ({
	name,
	time,
	id,
	dept,
	editable,
	getSchedules,
	toggleScheduleModal,
	showScheduleModal,
	shifts,
}) => {
	const [idToUpdate, setIdToUpdate] = useState(null);
	const [idToDelete, setIdToDelete] = useState(null);
	const [date, setDate] = useState(null);
	const [newShift, setNewShift] = useState(null);

	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const toggleEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const deleteSchedule = async () => {
		setDeleteLoading(true);

		const res = await DeleteScheduleById(idToDelete);

		if (res.success) {
			notify('Schedule deleted successfully');
			toggleDeleteModal();
			toggleScheduleModal(!showScheduleModal);
			getSchedules();
		} else {
			notify('Failed to delete schedule.', true);
		}

		setDeleteLoading(false);
	};

	const editScheduleShift = async () => {
		setEditLoading(true);

		if (newShift != null) {
			const res = await UpdateScheduleById(idToUpdate, { shift_id: newShift });

			if (res.success) {
				notify('Schedule updated successfully');
				toggleEditModal();
				toggleScheduleModal(!showScheduleModal);
				getSchedules();
			} else {
				notify('Failed to update schedule.', true);
			}
		}

		setEditLoading(false);
	};

	return (
		<div className="flex flex-col border-2 rounded-md p-2 mb-2">
			<CustomModal
				title={'Edit Schedule Shift'}
				showModal={showEditModal}
				toggleModal={toggleEditModal}
			>
				<LamparaDropdown
					label={'Shift'}
					placeholder={'Select Shift'}
					options={shifts}
					required={false}
					onChange={(option) => setNewShift(option.value)}
				/>
				<div className="flex justify-end">
					<LamparaButton
						loading={editLoading}
						loadingText={'Saving...'}
						onClick={() => editScheduleShift()}
						width={'w-120px'}
						label={'Save'}
					/>
				</div>
			</CustomModal>
			<CustomModal
				title={'Delete Schedule'}
				showModal={showDeleteModal}
				toggleModal={toggleDeleteModal}
			>
				<p>Are you sure you want to delete this schedule?</p>
				<div className="flex justify-end">
					<LamparaButton
						label={'Delete'}
						loading={deleteLoading}
						loadingText={'Deleting...'}
						bgColor="bg-red-500"
						width={'w-[100px]'}
						onClick={() => deleteSchedule()}
					/>
				</div>
			</CustomModal>
			<div className="flex justify-between">
				<h1 className="text-xs">
					Nurse: <span className="text-sm font-semibold">{name}</span>
				</h1>
				{editable && (
					<div className="flex gap-x-1 cursor-pointer">
						<LamparaIconButton
							onClick={() => {
								setIdToUpdate(id);
								toggleEditModal();
							}}
							color={'bg-blue-500'}
							icon={<AiOutlineEdit size={20} color="#FFFFFF" />}
						/>
						<LamparaIconButton
							onClick={() => {
								setIdToDelete(id);
								toggleDeleteModal();
							}}
							color={'bg-red-500'}
							icon={<AiOutlineDelete size={20} color="#FFFFFF" />}
						/>
					</div>
				)}
			</div>

			<p className="text-xs">
				Time: <span className="text-sm font-semibold">{time}</span>
			</p>
			<p className="text-xs">
				Department: <span className="text-sm font-semibold">{dept}</span>
			</p>
		</div>
	);
};

export default ScheduleCard;
