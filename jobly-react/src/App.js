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
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';


function App() { 

  return (
    <AuthProvider>
      <Router>
        <NavBar  />
        <Routes>
          <Route path="/login" element={<AuthRoute  />} />
          <Route path="/signup" element={<SignupRoute  />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="/companies" element={
            <ProtectedRoute>
              <CompaniesRoute />
            </ProtectedRoute>
          } />
          <Route path="/companies/:handle" element={
            <ProtectedRoute>
              <CompanyDetailRoute />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <JobsRoute />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<ProfileRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
