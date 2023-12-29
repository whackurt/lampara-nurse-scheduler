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
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
var socket, selectedChatCompare;

const Messages = () => {
	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);

	const [keyword, setKeyword] = useState('');
	const [searchTouched, setSearchTouched] = useState(false);
	const [results, setResults] = useState([]);
	const [resultId, setResultId] = useState(null);

	const [messages, setMessages] = useState([]);

	const [chatmate, setChatmate] = useState(null);
	const [activeChatMate, setActiveChatMate] = useState(null);

	const [showModal, setShowModal] = useState(false);

	const [socket, setSocket] = useState(false);
	const [socketConnected, setSocketConnected] = useState(null);

	const user = 'admin';
	const userId = localStorage.getItem('adminUserId');

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const fetchChats = async () => {
		const res = await GetChatsByUserId(userId, user);

		if (res.status === 200) {
			setChats(res.data.chats);
		}
	};

	const getChatMessages = async () => {
		const res = await GetMessages(selectedChat, user);

		if (res.status === 200) {
			setMessages(res.data);
		}
	};

	const getChatById = async () => {
		const res = await GetChatById(selectedChat, user);

		const chatmate = res.data.chat.users.filter((user) => user._id !== userId);

		if (res.status === 200) {
			setChatmate(chatmate[0].name);
			setActiveChatMate(chatmate[0]._id);
		}
	};

	const searchUsers = async (keyword) => {
		const res = await SearchUsers(keyword, userId, user);

		if (res.status == 200) {
			setResults(res.data?.users);
		}
	};

	const createChat = async () => {
		const res = await CreateChat(
			{
				chatName: 'chat',
				isGroupChat: false,
				users: [userId, resultId],
			},
			user
		);

		if (res.status == 201) {
			await fetchChats();
		}
		if (res.status == 200) {
			setSelectedChat(res.data?.chat._id);
		}

		setKeyword('');
		toggleModal();

		// console.log(res.data);
	};

	useEffect(() => {
		fetchChats();
	}, []);

	useEffect(() => {
		searchUsers(keyword);
	}, [keyword]);

	useEffect(() => {
		getChatMessages();
		getChatById();
	}, [selectedChat]);
	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>Messages - Lampara</title>
					<meta property="og:title" content="Schedule-Nurses - Lampara" />
				</Helmet>
			</HelmetProvider>
			<div className="lg:pl-8 lg:pr-56 py-8">
				<div className="flex shadow-sm w-full h-[600px]  rounded-md">
					<div className="w-[345px] h-full bg-gray-50 relative">
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
									console.log(resultId);
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

						<div className="shadow-sm px-4 py-2 bg-gray-300">
							<input
								className="rounded-xl shadow-sm px-3 h-8 w-full text-sm"
								placeholder="Search"
								type="text"
								value={keyword}
								onFocus={() => setSearchTouched(true)}
								onChange={(e) => setKeyword(e.target.value)}
							/>
						</div>

						<div className="z-40 h-[495px] bg-gray-50 overflow-y-auto">
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
											onClick={() => setSelectedChat(chat._id)}
											time={moment(chat.latestMessage?.updatedAt).format(
												'hh:mm a'
											)}
											name={chatmate[0]?.name}
											latestMsg={chat.latestMessage?.content}
										/>
									);
								})
							)}
						</div>
					</div>
					<div className="w-3/5 h-full bg-gray-100">
						{messages && (
							<ConversationContainer
								socket={socket}
								socketConnected={socketConnected}
								setSocketConnected={setSocketConnected}
								fetchChats={fetchChats}
								getChatMessages={getChatMessages}
								selectedChat={selectedChat}
								messages={messages}
								user={user}
								activeChatMate={activeChatMate}
								name={chatmate}
								position={'Nurse'}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Messages;
