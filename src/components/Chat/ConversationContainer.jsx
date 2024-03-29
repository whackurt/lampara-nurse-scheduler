import React, { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import LeftMsgCard from './LeftMsgCard';
import RightMsgCard from './RightMsgCard';
import { SendMessage } from '../../services/message.services';
import moment from 'moment';
import { io } from 'socket.io-client';

const ConversationContainer = ({
	name,
	selectedChat,
	activeChatMate,
	fetchChats,
	user,
	messages,
	setMessages,
	refreshChats,
}) => {
	const [newMessage, setNewMessage] = useState('');
	const socket = useRef();

	const messageEndRef = useRef(null);

	const userId =
		user === 'admin'
			? localStorage.getItem('adminUserId')
			: localStorage.getItem('nurseUserId');

	const sendMessage = async () => {
		const res = await SendMessage(
			{
				chatId: selectedChat,
				receiver: activeChatMate,
				sender: userId,
				copyOf: [activeChatMate, userId],
				content: newMessage,
			},
			user
		);

		if (res.status === 200) {
			const newMessage = res.data;

			setNewMessage('');
			setMessages((prev) => [...prev, newMessage]);

			refreshChats();

			// socket.current.emit('sendMessage', newMessage);
		}
	};

	// useEffect(() => {
	// 	const serverUrl =
	// 		'https://lampara-socket-server-production.up.railway.app/';

	// 	socket.current = io(serverUrl);

	// 	socket.current.on('welcome', (message) => {
	// 		// console.log(message);
	// 	});

	// 	socket.current.on('messageReceived', (newMessage) => {
	// 		setMessages((prev) => [...prev, newMessage.message]);
	// 		fetchChats();
	// 	});
	// }, []);

	// useEffect(() => {
	// 	socket.current.emit('addUser', userId);
	// }, [userId]);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="flex flex-col">
			<div className="flex h-[60px] gap-x-2 bg-primary p-2">
				{activeChatMate && (
					<>
						<div className="flex items-center ">
							<img
								width={40}
								src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/5-512.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col justify-center bg-primary ">
							<h1 className="font-semibold text-gray-200"> {name}</h1>
						</div>
					</>
				)}
			</div>

			<div
				className={`${
					name === 'skedle user' ? 'h-[477px]' : 'h-[497px]'
				}  bg-gray-100 overflow-y-auto`}
			>
				{activeChatMate == null ? (
					<div className="h-full flex justify-center items-center	">
						<p className="text-gray-500">No conversation selected</p>
					</div>
				) : (
					messages.map((msg) =>
						msg.sender?._id === userId ? (
							<RightMsgCard
								key={msg._id}
								message={msg.content}
								time={moment(msg.createdAt).calendar()}
							/>
						) : (
							<LeftMsgCard
								key={msg._id}
								message={msg.content}
								time={moment(msg.createdAt).calendar()}
							/>
						)
					)
				)}
				<div ref={messageEndRef} />
			</div>
			<div className="flex bg-red-500 text-white justify-center">
				{name === 'skedle user' && (
					<p className="text-sm">
						You can't send a message to this conversation.
					</p>
				)}
			</div>
			<div className="flex p-2 items-center gap-x-2 bg-gray-300">
				<div className="flex w-full">
					<input
						className="w-full text-sm px-2 rounded-2xl h-[30px]"
						type="text"
						placeholder="Type a message"
						value={newMessage}
						disabled={activeChatMate == null || name === 'skedle user'}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								sendMessage();
							}
						}}
					/>
				</div>

				<div onClick={() => sendMessage()} className="cursor-pointer">
					<IoMdSend size={20} color="#24234d" />
				</div>
			</div>
		</div>
	);
};

export default ConversationContainer;
