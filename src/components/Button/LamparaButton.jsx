import React from 'react';

const LamparaButton = ({ label, loading, loadingText, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="text-sm w-full mt-6 rounded-sm px-8 py-1 bg-primary text-white"
		>
			{loading ? loadingText : label}
		</button>
	);
};

export default LamparaButton;
