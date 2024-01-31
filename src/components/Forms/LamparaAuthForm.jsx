import React from 'react';

const LamparaAuthForm = ({
	label,
	type,
	required = true,
	onChange,
	disabled,
	placeholder,
	errorMsg,
}) => {
	return (
		<div className="flex flex-col justify-center py-2">
			<p className="text-sm font-medium text-secondary">
				{label} {required ? <span className="text-red-500">*</span> : ''}
			</p>
			<input
				onChange={onChange}
				className="text-sm h-8 px-2 border rounded-md"
				type={type}
				disabled={disabled}
				placeholder={placeholder}
			/>
			<p className="text-red-500 text-xs">{errorMsg}</p>
		</div>
	);
};

export default LamparaAuthForm;
