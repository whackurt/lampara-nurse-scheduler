import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './views/auth/forgot-password/forgot-password';
import AdminLogin from './views/auth/admin-login/admin-login';
import Messages from './views/admin/messages/messages';
import MessagesNurses from './views/nurse/messages/messages-nurses';
import NotFound from './views/not-found/not-found';
import NurseLogin from './views/auth/nurse-login/nurse-login';
import AuthenticatedAdminPrivateRoute from './components/PrivateRoute/AuthenticatedAdminPrivateRoute';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import AuthenticatedNursePrivateRoute from './components/PrivateRoute/AuthenticatedNursePrivateRoute';
import NursePrivateRoute from './components/PrivateRoute/NursePrivateRoute';
import AdminLayout from './components/Layouts/AdminLayout';
import NurseLayout from './components/Layouts/NurseLayout';
import AdminDashboard from './views/admin/dashboard/AdminDashboard';
import ManageSchedule from './views/admin/manage-schedule/ManageSchedule';
import ManageNurses from './views/admin/manage-nurses/ManageNurses';
import AdminAccountSettings from './views/admin/account-settings/AdminAccountSettings';
import NurseAccountSettings from './views/nurse/account-settings/NurseAccountSettings';
import MySchedule from './views/nurse/dashboard/MySchedule';
import { IoIosHome, IoMdSettings } from 'react-icons/io';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { FaUserNurse } from 'react-icons/fa';
import { AiFillSchedule } from 'react-icons/ai';

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
							<AdminLayout
								icon={<IoIosHome size={25} />}
								location={'Dashboard'}
							>
								<AdminDashboard />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/manage-nurses"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout
								icon={<FaUserNurse size={25} />}
								location={'Manage Nurses'}
							>
								<ManageNurses />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/messages"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout
								icon={<BiSolidMessageDetail size={25} />}
								location={'Messages'}
							>
								<Messages />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/manage-schedules"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout
								icon={<AiFillSchedule size={25} />}
								location={'Manage Schedule'}
							>
								<ManageSchedule />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/my-account"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout
								icon={<IoMdSettings size={25} />}
								location={'Account Settings'}
							>
								<AdminAccountSettings />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>

				{/* NURSE ROUTES */}
				<Route
					exact
					path="/nurse"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<NurseLayout
								icon={<AiFillSchedule size={25} />}
								location="My Schedule"
							>
								<MySchedule />
							</NurseLayout>
						</NursePrivateRoute>
					}
				/>
				<Route
					exact
					path="/nurse/messages"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<NurseLayout
								icon={<BiSolidMessageDetail size={25} />}
								location="Messages"
							>
								<MessagesNurses />
							</NurseLayout>
						</NursePrivateRoute>
					}
				/>
				<Route
					exact
					path="/nurse/my-account"
					element={
						<NursePrivateRoute user={'nurse'} redirect={'/nurse/login'}>
							<NurseLayout
								icon={<IoMdSettings size={25} />}
								location="Account Settings"
							>
								<NurseAccountSettings />
							</NurseLayout>
						</NursePrivateRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
