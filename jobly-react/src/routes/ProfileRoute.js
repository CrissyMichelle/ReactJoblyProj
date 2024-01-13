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

    const renderJobs = () => {
        return (
            <div>
                <h3>Applied-to Jobs</h3>
                <ul>
                    {userData.jobs.map(job => (
                        <li key={job.id}>
                            <strong>Title: </strong> {job.title} <br />
                            <strong>Company: </strong> {job.companyName} <br />
                            <strong>Salary: </strong> {job.salary ? `$${job.salary}` : "Not provided"} <br />
                            <strong>Equity: </strong> {job.equity ? job.equity : "None"} <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

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
            {userData.jobs && userData.jobs.length > 0 && renderJobs()}
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
