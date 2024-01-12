import React from 'react';
import { useAuth } from '../components/AuthContext';
import './HomeRoute.css';

function HomeRoute() {
    const { isLoggedIn, currentUser } = useAuth();

    return (
        <div className="home">
            {isLoggedIn ? (
                <h1>Welcome back, {currentUser}!</h1>
            ) : (
                <>
                    <h1>Welcome to Our Job Portal!</h1>
                    <p>
                        Please login or signup and nab your dream job at a top company.
                    </p>
                </>
            )}        
        </div>
    );
}

export default HomeRoute;
