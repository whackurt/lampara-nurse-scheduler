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
	width = null,
}) => {
	return (
		<div className="mb-4">
			<p className="font-light text-xs">
				{label} {required ? <span className="text-red-500">*</span> : ''}
			</p>
			<Dropdown
				className="rounded"
				controlClassName={`flex items-center rounded-md ${width} h-8 border`}
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
