import React from 'react';

const LeftMsgCard = ({ message, time }) => {
	return (
		<div className="flex flex-col my-1">
			<div className="">
				<div className="w-full flex  max-w-[350px] p-2">
					<div className="flex px-2 py-1 rounded-md bg-slate-300">
						<p className="text-sm font-light text-gray-700">{message}</p>
					</div>
				</div>
			</div>
			<p className="text-[10px] pl-3 -mt-1">{time}</p>
		</div>
	);
};

export default LeftMsgCard;
