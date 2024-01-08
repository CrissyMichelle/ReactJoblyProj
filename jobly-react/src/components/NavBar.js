import React from "react";
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, username, logout }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <span>Welcome, {username}</span>
                    <button onClick={logout}>Logout</button> 
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
