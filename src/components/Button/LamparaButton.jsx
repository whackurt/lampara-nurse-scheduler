import React from 'react';

const LamparaButton = ({
	label,
	bgColor = 'bg-primary',
	loading,
	loadingText,
	onClick,
	width,
}) => {
	return (
		<button
			onClick={onClick}
			className={`text-sm ${width} ${bgColor} mt-6 px-6 rounded-md py-1  text-white`}
		>
			{loading ? loadingText : label}
		</button>
	);
};

export default LamparaButton;
