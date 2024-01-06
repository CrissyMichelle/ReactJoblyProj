import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import CompaniesRoute from './routes/CompaniesRoute';
import CompanyDetailRoute from './routes/CompanyDetailRoute';
import JobsRoute from './routes/JobsRoute';
import ProfileRoute from './routes/ProfileRoute';
import AuthRoute from './routes/AuthRoute';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/companies" element={<CompaniesRoute />} />
        <Route path="/companies/:handle" element={<CompanyDetailRoute />} />
        <Route path="/jobs" element={<JobsRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/login" element={<AuthRoute />} />
        <Route path="/signup" element={<AuthRoute />} />
      </Routes>
    </Router>>
  );
}

export default App;
