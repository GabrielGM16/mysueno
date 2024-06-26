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
import About from './components/About'; // Importa el nuevo componente About
import Contact from './components/Contact';
import VerifyAccount from './components/VerifyAccount';

const App = () => {
  return (
    <Router>
      <NavigationProvider>
        <AxiosInterceptorSetup />
        <InactivityHandler>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* Nueva ruta */}
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/daily-habits" element={<DailyHabits />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/register" element={<Register />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/specialist-dashboard" element={<SpecialistDashboard />} />
            <Route path="/specialist-appointments" element={<SpecialistAppointments />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<VerifyAccount />} />
          </Routes>
        </InactivityHandler>
      </NavigationProvider>
    </Router>
  );
};

export default App;
