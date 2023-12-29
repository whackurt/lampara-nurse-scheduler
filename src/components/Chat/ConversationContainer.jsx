import React, { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoMdSend } from 'react-icons/io';
import LeftMsgCard from './LeftMsgCard';
import RightMsgCard from './RightMsgCard';
import { SendMessage } from '../../services/message.services';
import moment from 'moment';

const ConversationContainer = ({
	socket,
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
			}
			setNewMessage('');
			getChatMessages();
			fetchChats();
		}
	};

	useEffect(() => {
		if (socket) {
			socket.on('message received', (newMessageReceived) => {
				console.log(newMessageReceived);
				if (selectedChat != newMessageReceived.chat?._id) {
					console.log(`new msg rcvd: ${newMessageReceived}`);
				} else {
					getChatMessages();
					fetchChats();
				}
			});
		}
	}, []);

	useEffect(() => {
		if (socket) {
			socket.emit('setup', localStorage.getItem('nurseUserId'));
			socket.on('connected', () => {
				setSocketConnected(true);
				console.log('connected');
			});
		}
	}, []);

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
								message={msg.content}
								time={moment(msg.createdAt).calendar()}
							/>
						) : (
							<LeftMsgCard
								message={msg.content}
								time={moment(msg.createdAt).calendar()}
							/>
						)
					)
				)}
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

export default ConversationContainer;
