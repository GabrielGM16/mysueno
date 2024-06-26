import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Appointment from './components/Appointment';
import DailyHabits from './components/DailyHabits';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';
import Register from './components/Register';
import Summary from './components/Summary';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import SpecialistDashboard from './components/SpecialistDashboard';
import SpecialistAppointments from './components/SpecialistAppointments';
import InactivityHandler from './components/InactivityHandler';
import ErrorPage from './components/ErrorPage';
import { NavigationProvider } from './context/NavigationContext';
import AxiosInterceptorSetup from './components/AxiosInterceptorSetup';
import About from './components/About';
import Contact from './components/Contact';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyLoginCode from './components/VerifyLoginCode';

const App = () => {
  return (
    <Router>
      <NavigationProvider>
        <AxiosInterceptorSetup />
        <InactivityHandler>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/verify-login-code" element={<VerifyLoginCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/daily-habits" element={<DailyHabits />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['specialist', 'admin']} />}>
              <Route path="/specialist-dashboard" element={<SpecialistDashboard />} />
              <Route path="/specialist-appointments" element={<SpecialistAppointments />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['user', 'admin', 'specialist']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/summary" element={<Summary />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </InactivityHandler>
      </NavigationProvider>
    </Router>
  );
};

export default App;
