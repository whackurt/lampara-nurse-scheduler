import React, { useState } from 'react';

const CustomModal = ({ children, showModal, toggleModal, title }) => {
	return (
		showModal && (
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
				<div className="absolute bg-white w-full max-w-[450px] p-8 rounded shadow-lg">
					<span
						onClick={toggleModal}
						className="cursor-pointer text-2xl absolute top-0 right-0 p-4"
					>
						&times;
					</span>
					<h2 className="font-bold text-primary">{title}</h2>
					<hr />
					<div>
						<div className="flex flex-col py-4 max-h-[500px] overflow-y-auto">
							{children}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default CustomModal;
