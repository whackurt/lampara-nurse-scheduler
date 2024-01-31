import React from 'react';

const LamparaTextButtonWithIcon = ({
	label,
	icon,
	bgColor = 'bg-primary',
	loading,
	loadingText,
	onClick,
	width,
	type = null,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`text-sm ${width} ${bgColor}  hover:shadow-md mt-6 p-3 rounded-md py-1  text-white`}
		>
			<div className="flex justify-center items-center gap-x-1">
				{icon}
				<p>{loading ? loadingText : label}</p>
			</div>
		</button>
	);
};

export default LamparaTextButtonWithIcon;
