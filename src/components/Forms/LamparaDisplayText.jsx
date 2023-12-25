import React from 'react';

const LamparaDisplayText = ({ label, value }) => {
	return (
		<div className="flex flex-col mb-4">
			<p className="font-semibold">{label}</p>
			<div className="flex items-center rounded border-2 px-2 h-8">
				<p className="">{value}</p>
			</div>
		</div>
	);
};

export default LamparaDisplayText;
