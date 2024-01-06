import toast from 'react-hot-toast';

const notify = (message, error = false) => {
	!error
		? toast.success(message, { duration: 5000 })
		: toast.error(message, { duration: 5000 });
};

export default notify;
