import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className=" flex justify-center py-8">
			<ClipLoader color="#0077B6" />
		</div>
	);
};

export default Loader;
