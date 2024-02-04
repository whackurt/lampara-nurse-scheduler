import React from 'react';
import { BounceLoader, ClipLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className=" flex justify-center py-8">
			<BounceLoader size={35} color="#0077B6" />
		</div>
	);
};

export default Loader;
