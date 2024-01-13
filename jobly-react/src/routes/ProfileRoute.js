import React, { useContext, useState, useEffect } from "react";
import JoblyApi from "../api";
import { AuthContext } from "../components/AuthContext";
import EditProfile from "../components/EditProfile";

function ProfileRoute() {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log("Current user: ", currentUser);
        async function fetchUser() {
            if (JoblyApi.token) {
                try{
                    const user = await JoblyApi.getUser(currentUser);
                    console.log("Fetched user data: ", user);
                    setUserData(user);
                } catch (err) {
                    console.error(err);
                    setErrors(err);
                }
            }
            
        };
        fetchUser();
    }, [currentUser]);

    const handleEditToggle = () => {
        console.log("Toggle edit mode: ", !isEditing);
        setIsEditing(!isEditing);
    }

    if (errors) return <p>Error loading profile.</p>;
    if (!userData) return <p>Loading profile... ...</p>;

    console.log("Current user data: ", userData);
    return (
        <div>
            <h2>Profile Page</h2>
            <ul>
                <li>Username: {userData.username}</li>
                <li>First Name: {userData.firstName}</li>
                <li>Last Name: {userData.lastName}</li>
                <li>Email: {userData.email}</li>
            </ul>
            <button onClick={handleEditToggle}>Edit Profile</button>
        
            {isEditing && (
                <div>
                    <EditProfile
                        userData={userData}
                        setUserData={setUserData}
                        setIsEditing={setIsEditing}
                    />
                </div>
            )}
        </div>
    );
}

export default ProfileRoute;
