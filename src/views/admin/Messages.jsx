import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import ConversationCard from '../../components/Chat/ConversationCard';
import ConversationContainer from '../../components/Chat/ConversationContainer';
import {
	CreateChat,
	GetChatById,
	GetChatsByUserId,
	SearchUsers,
} from '../../services/chat.services';
import moment from 'moment';
import { GetMessages, SendMessage } from '../../services/message.services';

import SearchResult from '../../components/Chat/SearchResult';
import CustomModal from '../../components/Modal/CustomModal';
import LamparaButton from '../../components/Button/LamparaButton';
import { ClipLoader } from 'react-spinners';
import Loader from '../../components/Loader/Loader';

const Messages = () => {
	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);

	const [loading, setLoading] = useState(false);

	const [keyword, setKeyword] = useState('');
	const [searchTouched, setSearchTouched] = useState(false);
	const [results, setResults] = useState([]);
	const [resultId, setResultId] = useState(null);

	const [messages, setMessages] = useState([]);

	const [chatmate, setChatmate] = useState(null);
	const [activeChatMate, setActiveChatMate] = useState(null);

	const [showModal, setShowModal] = useState(false);

	const user = 'admin';
	const position = 'Nurse';
	const userId = localStorage.getItem('userId');

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const fetchChats = async () => {
		const res = await GetChatsByUserId(userId, user);
		if (res.status === 200) {
			const chats = res.data.chats;
			setChats(chats);
		}
	};

	const getChatMessages = async () => {
		if (selectedChat) {
			const res = await GetMessages(selectedChat, userId, user);
			if (res.status === 200) {
				const chatMessages = res.data;
				setMessages(chatMessages);
			}
		}
	};

	const getChatById = async () => {
		if (selectedChat) {
			const res = await GetChatById(selectedChat, user);

			if (selectedChat) {
				const chatmate = res.data.chat.users.filter(
					(user) => user._id !== userId
				);

				const chatMateName = chatmate[0] ? chatmate[0].name : 'skedle user';
				const chatMateId = chatmate[0] ? chatmate[0]._id : 'no id';
				if (res.status === 200) {
					setChatmate(chatMateName);
					setActiveChatMate(chatMateId);
				}
			}
		}
	};

	const searchUsers = async (keyword) => {
		const res = await SearchUsers(keyword, userId, user);

		if (res.status == 200) {
			const resultUsers = res.data?.users;
			setResults(resultUsers);
		}
	};

	const createChat = async () => {
		const res = await CreateChat(
			{
				chatName: 'chat',
				isGroupChat: false,
				copyOf: [userId, resultId],
				users: [userId, resultId],
			},
			user
		);

		if (res.status == 201) {
			await fetchChats();
		}
		if (res.status == 200) {
			await fetchChats();
			const chatId = res.data?.chat._id;
			setSelectedChat(chatId);
		}

		setKeyword('');
		toggleModal();
	};

	useEffect(() => {
		fetchChats();
	}, [activeChatMate]);

	useEffect(() => {
		searchUsers(keyword);
	}, [keyword]);

	useEffect(() => {
		setMessages([]);
		getChatMessages();
		getChatById();
	}, [selectedChat]);

	return (
		<div className="">
			<HelmetProvider>
				<Helmet>
					<title>Messages - skedle</title>
					<meta property="og:title" content="Messages - skedle" />
				</Helmet>
			</HelmetProvider>
			<div className="flex shadow-sm w-full h-[600px]  rounded-md">
				<div className="w-[350px] relative h-full bg-gray-50">
					<div className="flex items-center gap-x-2 bg-primary h-[60px] px-2">
						<HiChatBubbleLeftRight size={30} color="FFFFFF" />
						<p className="text-white font-bold text-xl">Your Messages</p>
					</div>

					<CustomModal
						title={'Create Chat'}
						showModal={showModal}
						toggleModal={toggleModal}
					>
						<p>Are you sure you want to create chat?</p>
						<LamparaButton
							label={'Create'}
							onClick={async () => {
								await createChat();
							}}
						/>
					</CustomModal>
					{searchTouched && keyword != '' && (
						<div className="z-50 absolute flex items-center justify-center px-4 py-2 mt-12 bg-white w-full min-h-[40px]">
							<div className="w-full">
								{results.map((res) => (
									<SearchResult
										key={res._id}
										name={res.name}
										onClick={() => {
											setResultId(res._id);
											toggleModal();
										}}
									/>
								))}
							</div>
						</div>
					)}

					<div className="px-4 py-2 bg-gray-300">
						<input
							className="rounded-xl shadow-sm px-3 h-8 w-full"
							placeholder="Search"
							type="text"
							value={keyword}
							onFocus={() => setSearchTouched(true)}
							onChange={(e) => setKeyword(e.target.value)}
						/>
					</div>

					{loading ? (
						<Loader />
					) : (
						<div className="z-40  h-[495px] bg-gray-50 overflow-y-auto">
							{chats.length == 0 ? (
								<div className="flex items-center justify-center h-full">
									<p className="text-gray-500 text-sm text-center">
										No conversation found
									</p>
								</div>
							) : (
								chats.map((chat) => {
									const chatmate = chat.users.filter(
										(user) => user._id !== userId
									);
									return (
										<ConversationCard
											key={chat._id}
											chatId={chat._id}
											userId={userId}
											fetchChats={fetchChats}
											getChatMessages={getChatMessages}
											onClick={() => setSelectedChat(chat._id)}
											time={moment(chat.latestMessage?.updatedAt).format(
												'hh:mm a'
											)}
											name={chatmate[0]?.name}
											latestMsg={chat.latestMessage?.content}
											user={user}
											setActiveChatMate={setActiveChatMate}
											setMessages={setMessages}
										/>
									);
								})
							)}
						</div>
					)}
				</div>
				<div className="w-full h-full bg-gray-100">
					{messages && (
						<ConversationContainer
							fetchChats={fetchChats}
							selectedChat={selectedChat}
							messages={messages}
							setMessages={setMessages}
							setActiveChatMate={setActiveChatMate}
							user={user}
							activeChatMate={activeChatMate}
							name={chatmate}
							position={position}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Messages;
