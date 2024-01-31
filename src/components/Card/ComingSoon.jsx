import React from 'react';
import Icon from '../../assets/skedio-icon.png';

const ComingSoon = () => {
	return (
		<div className="flex flex-col items-center justify-center rounded-md p-16 bg-primary">
			<div className="">
				<img
					className="border-4 border-white rounded"
					src={Icon}
					width={50}
					alt="page-under-construction"
				/>
			</div>
			<p className="text-white mt-4">This feature is</p>
			<p className="text-white text-3xl font-bold">Coming soon!</p>
		</div>
	);
};

export default ComingSoon;
