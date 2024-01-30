import React from 'react';

const StatisticsCard = ({ title, value, icon }) => {
	return (
		<div className="border  h-24 w-40 bg-white p-2 rounded-md">
			<div className="flex gap-x-1">
				{icon}
				<p className="font-bold text-lg text-secondary">{title}</p>
			</div>
			<hr />
			<div className="flex justify-end pt-3">
				<p className="font-bold text-3xl text-secondary">{value}</p>
			</div>
		</div>
	);
};

export default StatisticsCard;
