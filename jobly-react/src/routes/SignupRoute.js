import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupRoute.css';
import JoblyApi from "../api";

function SignupRoute({ signup }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // front-end validation of password length
        if (formData.password.length < 5) {
            setErrors(['Password must be at least 5 characters long']);
            return;
        }
        
        try{
            const { token } = await JoblyApi.registerUser(formData);
            if (token) {
                signup(token);
                navigate('/profile');
            }            
        } catch (errs) {
            console.error(errs);
            const message = errs.response?.data?.error?.message || ['Signup failed'];
            setErrors(Array.isArray(message) ? message : [message]);
        }
    };



    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <button type="submit">Sign Up!</button>
            {errors && <div className="errors">{errors}</div>}
        </form>
    );
}

export default SignupRoute;
