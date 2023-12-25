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

	const toggleEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const deleteSchedule = async () => {
		setLoading(true);

		const res = await DeleteScheduleById(idToDelete);

		if (res.success) {
			toggleDeleteModal();
			toggleScheduleModal(!showScheduleModal);
			getSchedules();
		}

		setLoading(false);
	};

	const editScheduleShift = async () => {
		setLoading(true);

		if (newShift != null) {
			const res = await UpdateScheduleById(idToUpdate, { shift_id: newShift });

			if (res.success) {
				toggleEditModal();
				toggleScheduleModal(!showScheduleModal);
				getSchedules();
			}
		}

		setLoading(false);
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
						loading={loading}
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
						loading={loading}
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
					<div className="flex cursor-pointer">
						<div
							onClick={() => {
								setIdToUpdate(id);
								toggleEditModal();
							}}
						>
							<FaEdit size={20} color="#05122e" />
						</div>
						<div
							onClick={() => {
								setIdToDelete(id);
								toggleDeleteModal();
							}}
						>
							<MdOutlineDeleteOutline size={20} color="#b31717" />
						</div>
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
