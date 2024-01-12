import React, { useContext, useState, useEffect } from "react";
import JoblyApi from "../api";
import { AuthContext } from "../components/AuthContext";

function ProfileRoute() {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        console.log("Current user: ", currentUser);
        async function fetchUser() {
            if (JoblyApi.token) {
                try{
                    const user = await JoblyApi.getUser(currentUser);
                    setUserData(user);
                } catch (err) {
                    console.error(err);
                    setErrors(err);
                }
            }
            
        };
        fetchUser();
    }, [currentUser]);

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
