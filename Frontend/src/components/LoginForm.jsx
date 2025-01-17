import React, { useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { BASE_URL } from "../constants";
const LoginForm = () => {
    const { isLoggedin, storeUserData, LogOut } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const [warnText, setWarnText] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setWarnText("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle form submission here
        console.log(formData);
        try {
            let response = await axios.post(
                `${BASE_URL}/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            console.log(response.data.user);
            console.log(response.data.token);
            storeUserData(response.data.token);
            //console.log(response.data);

            navigate("/");
        } catch (err) {
            console.log(err);
            console.log(err.response);
            setWarnText(err.response.data.message);
        }
    };

    return (
        <div className="loginflex">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {warnText && <p style={{ color: "red" }}>{warnText}</p>}
                <button className="btnPadding" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
