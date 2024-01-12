import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function NavBar() {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <span>Welcome, {currentUser}</span>
                    <button onClick={handleLogout}>Logout</button> 
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;
