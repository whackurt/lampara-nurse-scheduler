import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './views/auth/forgot-password/forgot-password';
import AdminLogin from './views/auth/AdminLogin';
import AdminMessages from './views/admin/Messages';
import NurseMessages from './views/nurse/Messages';
import NotFound from './views/not-found/not-found';
import NurseLogin from './views/auth/NurseLogin';
import AuthenticatedAdminPrivateRoute from './components/PrivateRoute/AuthenticatedAdminPrivateRoute';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import AuthenticatedNursePrivateRoute from './components/PrivateRoute/AuthenticatedNursePrivateRoute';
import NursePrivateRoute from './components/PrivateRoute/NursePrivateRoute';
import AdminLayout from './components/Layouts/AdminLayout';
import NurseLayout from './components/Layouts/NurseLayout';
import AdminDashboard from './views/admin/AdminDashboard';
import ManageSchedule from './views/admin/ManageSchedule';
import ManageNurses from './views/admin/ManageNurses';
import AdminAccountSettings from './views/admin/AdminAccountSettings';
import NurseAccountSettings from './views/nurse/NurseAccountSettings';
import MySchedule from './views/nurse/MySchedule';
import { LuCalendarClock } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { TbNurse } from 'react-icons/tb';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { TbSettings } from 'react-icons/tb';
import ManageShifts from './views/admin/ManageShifts';
import LandingPage from './views/LandingPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<LandingPage />} />

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
								icon={<MdOutlineDashboard size={25} />}
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
								icon={<TbNurse size={25} />}
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
								icon={<BiMessageSquareDetail size={25} />}
								location={'Messages'}
							>
								<AdminMessages />
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
								icon={<HiOutlineCalendarDays size={25} />}
								location={'Manage Schedules'}
							>
								<ManageSchedule />
							</AdminLayout>
						</AdminPrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin/manage-shifts"
					element={
						<AdminPrivateRoute user={'admin'} redirect={'/admin/login'}>
							<AdminLayout
								icon={<LuCalendarClock size={25} />}
								location={'Manage Shifts'}
							>
								<ManageShifts />
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
								icon={<TbSettings size={25} />}
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
								icon={<HiOutlineCalendarDays size={25} />}
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
								icon={<BiMessageSquareDetail size={25} />}
								location="Messages"
							>
								<NurseMessages />
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
								icon={<TbSettings size={25} />}
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
