import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ redirect, children, user }) => {
	if (!localStorage.getItem('adminToken') && user === 'admin') {
		return <Navigate to={redirect} replace />;
	}
	return children;
};

export default AdminPrivateRoute;
