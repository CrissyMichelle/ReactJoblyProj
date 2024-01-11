import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from './components/NavBar';
import HomeRoute from './routes/HomeRoute';
import CompaniesRoute from './routes/CompaniesRoute';
import CompanyDetailRoute from './routes/CompanyDetailRoute';
import JobsRoute from './routes/JobsRoute';
import ProfileRoute from './routes/ProfileRoute';
import SignupRoute from './routes/SignupRoute';
import AuthRoute from './routes/AuthRoute';
import JoblyApi from './api';
import './App.css';

export const AuthContext = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    JoblyApi.token = token;
    console.log("Token set in JoblyApi: ", JoblyApi.token);
    try {
      if (token) {
        const user = jwtDecode(token);
        console.log("Decoded user: ", user);
        setCurrentUser(user.username);
      } else {
        setCurrentUser('');
      }
    } catch (err) {
      console.error("Error decoding token: ", err);
      setCurrentUser(null);
      setToken(null); // clearing invalid token
    }    
  }, [token]);

  function login(newToken) {
    const user = jwtDecode(newToken);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('username', user.username);
    
    setToken(newToken);
    setCurrentUser(user.username);

    JoblyApi.token = newToken
  }

  function logout() {
    console.log("Logging out user");

    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setToken(null);
    setCurrentUser('');
  }

  function signup(newToken) {
    console.log("Signup token: ", newToken);

    setToken(newToken);
  }

  const isLoggedIn = !!token; // true if token is null=false

  return (
    <AuthContext.Provider value={{ token, setToken, currentUser, login, logout, signup }}>
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
    </AuthContext.Provider>
  );
}

export default App;
