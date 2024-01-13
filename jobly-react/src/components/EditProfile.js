import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import JoblyApi from "../api";

function EditProfile({ userData, setUserData, setIsEditing }) {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || ''
    });
    const [changedData, setChangedData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data: ", changedData);

        try {
            const updatedUser = await JoblyApi.updateUser(currentUser, formData);
            setUserData(updatedUser);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({...f, [name]: value }));
        setChangedData(c => ({...c, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditProfile;
