import React from 'react';

const LamparaBasicInput = ({
	type = 'text',
	disabled,
	placeholder,
	onChange,
	label,
	required = true,
	errorMsg,
}) => {
	return (
		<div className="flex flex-col justify-center py-2">
			<p className="text-xs text-secondary">
				{label} {required ? <span className="text-red-500">*</span> : ''}
			</p>
			<input
				className="text-sm h-8 px-2 border rounded-md"
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<p className="text-red-500 text-xs">{errorMsg}</p>
		</div>
	);
};

export default LamparaBasicInput;
