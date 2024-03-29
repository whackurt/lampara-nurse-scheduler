import React from 'react';
import Loader from '../Loader/Loader';
import { BounceLoader } from 'react-spinners';

const StatisticsCard = ({ title, value, icon, loading }) => {
	return (
		<div className="border  h-24 w-40 bg-white p-2 rounded-md">
			<div className="flex gap-x-1">
				{icon}
				<p className="font-bold text-lg text-secondary">{title}</p>
			</div>
			<hr />
			<div className="flex justify-end pt-3">
				{loading ? (
					<div className="flex items-center">
						<BounceLoader size={20} color="#0077B6" />
					</div>
				) : (
					<p className="font-bold text-3xl text-secondary">{value}</p>
				)}
			</div>
		</div>
	);
};

export default StatisticsCard;
