import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DonorSignup from './pages/DonorSignup';
import DonorLogin from './pages/DonorLogin';
import NGOSignup from './pages/NGOSignup';
import NGOLogin from './pages/NGOLogin';
import AddDonation from './pages/AddDonation';
import DonationsList from './pages/DonationsList';
import DonorDashboard from './pages/DonorDashboard';
import JoinUs from './pages/JoinUs';
import LogOut from './pages/LogOut';
import NGODetails from './pages/NGODetails';
import DonorDetails from './pages/DonorDetails';
import NGODashboard from './pages/NGODashboard';
import AboutUs from './pages/AboutUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/donor/signup" element={<DonorSignup />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/ngo/signup" element={<NGOSignup />} />
        <Route path="/ngo/login" element={<NGOLogin />} />
        <Route path="/addDonation" element={<AddDonation />} />
        <Route path="/donationsList" element={<DonationsList />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/joinUs" element={<JoinUs />} />
        <Route path="/logOut" element={<LogOut />} />
        <Route
          path="/ngo/search/:ngoId"
          element={<NGODetails />}
        />
        <Route
          path="/donor/search/:donorId"
          element={<DonorDetails />}
        />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
