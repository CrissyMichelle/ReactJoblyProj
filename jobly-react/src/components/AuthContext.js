import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "../api";

// creating authenticaton context to manage auth state across app
export const AuthContext = createContext();
// use context to create protected routes that redirect
//  unauthenticated users to login page
export const AuthProvider = ({ children }) => {
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
    <AuthContext.Provider value={{ token, setToken, currentUser, isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
