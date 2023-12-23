import React from 'react';
import { Navigate } from 'react-router-dom';

const NursePrivateRoute = ({ redirect, children, user }) => {
	if (!localStorage.getItem('nurseToken') && user === 'nurse') {
		return <Navigate to={redirect} replace />;
	}
	return children;
};

export default NursePrivateRoute;
