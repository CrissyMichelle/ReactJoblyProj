import React, { useState } from "react";
import JoblyApi from "../api";

function EditProfile({ currentUser, setUserData }) {
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateUser = await JoblyApi.updateUser(currentUser.username, formData);
            setUserData(updateUser);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({...f, [name]: value }));
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
