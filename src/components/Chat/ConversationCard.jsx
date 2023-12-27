import React from 'react';

const ConversationCard = ({ name, latestMsg, time, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="cursor-pointer  bg-gray-50 hover:bg-gray-100 h-16 w-full flex items-center p-2 border-b border-t"
		>
			<div className="flex gap-x-3 relative">
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
			</div>
		</div>
	);
};

export default ConversationCard;
