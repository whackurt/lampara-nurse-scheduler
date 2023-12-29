import React, { useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoMdSend } from 'react-icons/io';
import LeftMsgCard from './LeftMsgCard';
import RightMsgCard from './RightMsgCard';
import { SendMessage } from '../../services/message.services';
import moment from 'moment';
import { io } from 'socket.io-client';

const ConversationContainerCopy = ({
	// socket,
	socketConnected,
	setSocketConnected,
	name,
	position,
	selectedChat,
	activeChatMate,
	getChatMessages,
	fetchChats,
	user,
	messages,
	setMessages,
}) => {
	const [newMessage, setNewMessage] = useState(null);
	const [socket, setSocket] = useState(null);
	const messageEndRef = useRef(null);

	const sendMessage = async () => {
		const res = await SendMessage(
			{
				chatId: selectedChat,
				receiver: activeChatMate,
				sender: localStorage.getItem('nurseUserId'),
				content: newMessage,
			},
			'nurse'
		);

		if (res.status === 200) {
			if (socket) {
				socket.emit('new message', res.data);
				setMessages([...messages, res.data]);
				setNewMessage('');
			}
		}
	};

	useEffect(() => {
		if (!socket) {
			setSocket(
				io('http://localhost:3000', {
					transports: ['websocket', 'polling', 'flashsocket'],
				})
			);
		}
	}, []);

	useEffect(() => {
		socket?.emit('addUser', localStorage.getItem('nurseUserId'));
		socket?.on('getUsers', (users) => {
			console.log('users', users);
		});
	}, []);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView();
	}, [messages, selectedChat]);

	return (
		<div className="flex flex-col">
			<h1 className="text-red-500 font-semibold">
				Conversation container Copy
			</h1>
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
						<div className="flex flex-col bg-primary ">
							<h1 className="font-semibold text-gray-200"> {name} </h1>
							<p className="text-xs text-gray-400">{position}</p>
						</div>
					</>
				)}
			</div>

			<div className="h-[497px] bg-gray-100 overflow-y-auto">
				{activeChatMate == null ? (
					<div className="h-full flex justify-center items-center	">
						<p className="text-gray-500">No chat selected</p>
					</div>
				) : (
					messages.map((msg) =>
						msg.sender?._id === localStorage.getItem('nurseUserId') ? (
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

			<div className="flex p-2 items-center gap-x-2 bg-gray-300">
				<div className="flex w-full">
					<input
						className="w-full text-sm px-2 rounded-2xl h-[30px]"
						type="text"
						placeholder="Type a message"
						value={newMessage}
						disabled={activeChatMate == null}
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

export default ConversationContainerCopy;
