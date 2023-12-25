import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const LamparaDropdown = ({
	options,
	required = true,
	label,
	onChange,
	placeholder,
	defaultOption,
}) => {
	return (
		<div className="mb-4">
			<p className="font-light text-xs">
				{label} {required ? <span className="text-red-500">*</span> : ''}
			</p>
			<Dropdown
				controlClassName="flex items-center rounded-md h-8 border-2 "
				className="rounded"
				menuClassName="text-sm"
				placeholderClassName="text-sm"
				arrowClassName="flex items-center"
				options={options}
				onChange={onChange}
				value={defaultOption && null}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default LamparaDropdown;
