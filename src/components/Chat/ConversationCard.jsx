import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { DeleteChat } from '../../services/chat.services';
import CustomModal from '../Modal/CustomModal';
import LamparaButton from '../Button/LamparaButton';

const ConversationCard = ({
	chatId,
	userId,
	name,
	latestMsg,
	time,
	onClick,
	setMessages,
	user,
	setActiveChatMate,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const deleteChat = async () => {
		setLoading(true);

		const res = await DeleteChat(chatId, userId, user);

		if (res.status === 200) {
			setActiveChatMate(null);
			setMessages([]);
		}

		setLoading(false);
		toggleModal();
	};

	return (
		<div
			onClick={onClick}
			className="cursor-pointer  bg-gray-50 hover:bg-gray-100 h-16 w-full flex items-center p-2 border-b border-t"
		>
			<div className="flex gap-x-3 relative">
				<CustomModal
					title={'Delete Chat'}
					showModal={showModal}
					toggleModal={toggleModal}
				>
					<p>Are you sure you want to delete chat?</p>
					<div className="flex justify-end">
						<LamparaButton
							loading={loading}
							loadingText={'Deleting...'}
							bgColor="bg-red-500"
							width={'w-48'}
							label={'Delete'}
							onClick={() => deleteChat()}
						/>
					</div>
				</CustomModal>
				<div className="text-[10px] absolute  right-0">{time}</div>
				<div className="flex items-center">
					<img
						width={40}
						src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/5-512.png"
						alt=""
					/>
				</div>
				<div className="flex flex-col justify-center w-72 h-12 overflow-clip ">
					<h1 className="text-sm font-semibold ">{name}</h1>
					<p className="text-xs overflow-y-hidden">{latestMsg}</p>
				</div>
				<div
					onClick={() => toggleModal()}
					className="flex justify-center items-end "
				>
					{user === 'admin' ? (
						<MdOutlineDeleteOutline size={20} color="#b31717" />
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ConversationCard;
