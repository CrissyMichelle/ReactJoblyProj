import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function ProfileRoute() {
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try{
                const userId = localStorage.getItem('userId');
                const user = await JoblyApi.getUser(userId);
                setUserData(user);
            } catch (err) {
                console.error(err);
                setErrors(err);
            }
        };
        fetchUser();
    }, []);

    if (errors) return <p>Error loading profile.</p>;
    if (!userData) return <p>Loading profile... ...</p>;

    return (
        <div>
            <h2>Profile Page</h2>
            <ul>
                <li>Username: {userData.username}</li>
                <li>First Name: {userData.firstName}</li>
                <li>Last Name: {userData.lastName}</li>
                <li>Email: {userData.email}</li>
            </ul>
            <button>Edit Profile</button>
        </div>
    );
}

export default ProfileRoute;
