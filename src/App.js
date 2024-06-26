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
import AuthenticatedRoute from './components/AuthenticatedRoute';

const App = () => {
  return (
    <Router>
      <NavigationProvider>
        <AxiosInterceptorSetup />
        <InactivityHandler>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointment" element={<AuthenticatedRoute component={Appointment} />} />
            <Route path="/daily-habits" element={<AuthenticatedRoute component={DailyHabits} />} />
            <Route path="/dashboard" element={<AuthenticatedRoute component={Dashboard} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<AuthenticatedRoute component={Profile} />} />
            <Route path="/recommendations" element={<AuthenticatedRoute component={Recommendations} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/summary" element={<AuthenticatedRoute component={Summary} />} />
            <Route path="/user-dashboard" element={<AuthenticatedRoute component={UserDashboard} />} />
            <Route path="/admin-dashboard" element={<AuthenticatedRoute component={AdminDashboard} />} />
            <Route path="/specialist-dashboard" element={<AuthenticatedRoute component={SpecialistDashboard} />} />
            <Route path="/specialist-appointments" element={<AuthenticatedRoute component={SpecialistAppointments} />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
          </Routes>
        </InactivityHandler>
      </NavigationProvider>
    </Router>
  );
};

export default App;
