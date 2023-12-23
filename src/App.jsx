import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
import './style.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* AUTH ROUTES */}
				<Route exact path="/admin/login" element={<AdminLogin />} />
				<Route element={<NurseLogin />} exact path="/nurse/login" />
				<Route element={<ForgotPassword />} exact path="auth/forgot-password" />

				{/* ADMIN ROUTES */}
				<Route element={<Dashboard />} exact path="/admin" />
				<Route element={<Nurses />} exact path="/admin/manage-nurses" />
				<Route element={<Messages />} exact path="/admin/messages" />
				<Route
					element={<ViewSchedule />}
					exact
					path="/admin/manage-schedules"
				/>
				<Route element={<Account />} exact path="/admin/my-account" />

				{/* NURSE ROUTES */}
				<Route element={<DashboardNurses />} exact path="/nurse" />
				<Route element={<MessagesNurses />} exact path="/nurse/messages" />
				<Route element={<AccountNurses />} exact path="/nurse/my-account" />

				<Route element={<NotFound />} path="*" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
