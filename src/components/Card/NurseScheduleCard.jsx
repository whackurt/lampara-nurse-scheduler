import React from 'react';

const NurseScheduleCard = ({ time, dept }) => {
	return (
		<div className="flex flex-col border-2 rounded-md p-2 mb-2">
			<p className="text-xs">
				Time: <span className="text-sm font-semibold">{time}</span>
			</p>
			<p className="text-xs">
				Department: <span className="text-sm font-semibold">{dept}</span>
			</p>
		</div>
	);
};

export default NurseScheduleCard;
