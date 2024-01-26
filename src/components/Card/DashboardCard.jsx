import React from 'react';

const DashboardCard = ({ title, value, icon }) => {
	return (
		<div className="border border-slate-100 shadow h-24 w-40 bg-white p-2 rounded-md">
			<div className="flex gap-x-1">
				{icon}
				<p className="font-bold text-lg text-primary">{title}</p>
			</div>
			<hr />
			<div className="flex justify-end pt-3">
				<p className="font-bold text-3xl text-primary">{value}</p>
			</div>
		</div>
	);
};

export default DashboardCard;
