import React from 'react';
import { IoMdSend } from 'react-icons/io';

const SearchResult = ({ name, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="cursor-pointer border-b mb-1 py-1 flex w-full items-center justify-between"
		>
			<p className="text-sm font-semibold"> {name} </p>
			<div>
				<IoMdSend />
			</div>
		</div>
	);
};

export default SearchResult;
