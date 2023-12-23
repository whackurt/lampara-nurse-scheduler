import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedNursePrivateRoute = ({ children }) => {
	if (localStorage.getItem('nurseToken')) {
		return <Navigate to={'/nurse'} replace />;
	}

	return children;
};

export default AuthenticatedNursePrivateRoute;
