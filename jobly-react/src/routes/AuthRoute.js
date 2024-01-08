import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupRoute.css';
import JoblyApi from "../api";

function AuthRoute() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        try{
            const token = await JoblyApi.authUser(formData);
            if (token) {
                JoblyApi.setToken(token);
                navigate('/profile');
            } else {
                setErrors(['Login failed']);
            }
        } catch (errs) {
            console.error(errs);
            setErrors(errs);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
            {errors && <div className="errors">{errors}</div>}
        </form>
    );
}

export default AuthRoute;
