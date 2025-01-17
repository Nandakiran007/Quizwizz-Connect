import React, { useState } from "react";

import bg from "../assets/question.jpg";
import "../components/css/Login.css";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
    const [inlogin, setInlogin] = useState("login");

    const handleToggleClick = (event) => {
        setInlogin(event.target.name);
        console.log(event.target);
    };
    const changeToLogin = () => {
        setInlogin("login");
    };
    return (
        <>
            <div id="Login">
                <div className="bgLogin">
                    <div className="bg-img">
                        <img src={bg} alt="ques" />
                    </div>
                    <div className="form-flex">
                        <div className="headings">
                            <nav>
                                <div className="button-box ">
                                    <div id="btn"></div>
                                    <button
                                        name="signup"
                                        className={`toggle-btn ${
                                            inlogin !== "login" && "specialBg"
                                        } togg`}
                                        onClick={handleToggleClick}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        name="login"
                                        className={`toggle-btn ${
                                            inlogin === "login" && "specialBg"
                                        } togg`}
                                        onClick={handleToggleClick}
                                    >
                                        Login
                                    </button>
                                </div>
                            </nav>
                        </div>
                        {inlogin === "signup" && <SignupForm />}
                        {inlogin === "login" && <LoginForm />}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
