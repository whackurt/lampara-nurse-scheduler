import React from 'react';

const LamparaInputForm = ({ onChange, type, placeholder, label }) => {
	return (
		<div className="flex flex-col justify-center py-2">
			<p className="font-light text-xs">{label}</p>
			<input
				className="text-sm h-8 px-2 border-2 "
				type={type}
				name={label}
				required
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default LamparaInputForm;
