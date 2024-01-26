import React from 'react';

const LamparaInputForm = ({
	onChange,
	type = 'text',
	disabled,
	placeholder,
	label,
	required = true,
}) => {
	return (
		<div className="flex flex-col justify-center py-2">
			<p className="text-sm font-medium text-secondary">
				{label} {required ? <span className="text-red-500">*</span> : ''}
			</p>
			<input
				className="text-sm h-10 px-2 border-2 rounded-md"
				type={type}
				name={label}
				disabled={disabled}
				required={required}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default LamparaInputForm;
