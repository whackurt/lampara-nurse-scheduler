import React from 'react';

const LamparaIconButton = ({ icon, onClick, color }) => {
	return (
		<div
			onClick={onClick}
			className={`bg-primary ${color} hover:shadow-md p-1 rounded`}
		>
			{icon}
		</div>
	);
};

export default LamparaIconButton;
