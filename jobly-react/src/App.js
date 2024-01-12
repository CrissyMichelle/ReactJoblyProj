import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import CompaniesRoute from './routes/CompaniesRoute';
import CompanyDetailRoute from './routes/CompanyDetailRoute';
import JobsRoute from './routes/JobsRoute';
import ProfileRoute from './routes/ProfileRoute';
import SignupRoute from './routes/SignupRoute';
import AuthRoute from './routes/AuthRoute';
import './App.css';



function App() { 
  const { isLoggedIn, currentUser, logout, signup } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} username={currentUser} logout={logout} />
        <Routes>
          <Route path="/login" element={<AuthRoute login={login} />} />
          <Route path="/signup" element={<SignupRoute signup={signup} />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="/companies" element={<CompaniesRoute />} />
          <Route path="/companies/:handle" element={<CompanyDetailRoute />} />
          <Route path="/jobs" element={<JobsRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
