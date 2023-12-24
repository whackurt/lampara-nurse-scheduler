import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ViewSchedule from './views/admin/manage-schedule/view-schedule';
import Nurses from './views/admin/manage-nurses/nurses';
import ForgotPassword from './views/auth/forgot-password/forgot-password';
import Dashboard from './views/admin/dashboard/dashboard';
import DashboardNurses from './views/nurse/dashboard/dashboard-nurses';
import AdminLogin from './views/auth/admin-login/admin-login';
import Messages from './views/admin/messages/messages';
import MessagesNurses from './views/nurse/messages/messages-nurses';
import Account from './views/admin/account-settings/account';
import NotFound from './views/not-found/not-found';
import AccountNurses from './views/nurse/account-settings/account-nurses';
import NurseLogin from './views/auth/nurse-login/nurse-login';
// import './style.css';
import AuthenticatedAdminPrivateRoute from './components/PrivateRoute/AuthenticatedAdminPrivateRoute';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import AuthenticatedNursePrivateRoute from './components/PrivateRoute/AuthenticatedNursePrivateRoute';
import NursePrivateRoute from './components/PrivateRoute/NursePrivateRoute';
import AdminLayout from './components/Layouts/AdminLayout';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* AUTH ROUTES */}
				<Route
					exact
					path="/admin/login"
					element={
						<AuthenticatedAdminPrivateRoute>
							<AdminLogin />
						</AuthenticatedAdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/nurse/login"
					element={
						<AuthenticatedNursePrivateRoute>
							<NurseLogin />
						</AuthenticatedNursePrivateRoute>
					}
				/>
				<Route exact path="auth/forgot-password" element={<ForgotPassword />} />

				{/* ADMIN ROUTES */}
				<Route
					exact
					path="/admin"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout location={'Dashboard'}>
								<Dashboard />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/manage-nurses"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<Nurses />
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/messages"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<Messages />
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/manage-schedules"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<ViewSchedule />
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/my-account"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<Account />
						</AdminPrivateRoute>
					}
				/>

				{/* NURSE ROUTES */}
				<Route
					exact
					path="/nurse"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<DashboardNurses />
						</NursePrivateRoute>
					}
				/>
				<Route
					exact
					path="/nurse/messages"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<MessagesNurses />
						</NursePrivateRoute>
					}
				/>
				<Route
					exact
					path="/nurse/my-account"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<AccountNurses />
						</NursePrivateRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
