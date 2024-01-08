import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import CompaniesRoute from './routes/CompaniesRoute';
import CompanyDetailRoute from './routes/CompanyDetailRoute';
import JobsRoute from './routes/JobsRoute';
import ProfileRoute from './routes/ProfileRoute';
import SignupRoute from './routes/SignupRoute';
import AuthRoute from './routes/AuthRoute';

import './App.css';
import JoblyApi from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  function login(token, username) {
    JoblyApi.setToken(token);
    setIsLoggedIn(true);
    setUsername(username);
  }

  function logout() {
    JoblyApi.setToken(null);
    setIsLoggedIn(false);
    setUsername('');
  }

  function signup(token, username) {
    JoblyApi.setToken(token);
    setIsLoggedIn(true);
    setUsername(username);
  }

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} username={username} logout={logout} />
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
  );
}

export default App;
