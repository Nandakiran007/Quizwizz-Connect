import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { NavLink } from "react-router-dom";
import "./css/Navbar.css";
import { useAuth } from "../contexts/auth";
import { useEffect } from "react";
const Navbar = () => {
    const { isLoggedin } = useAuth();
    useEffect(() => {
        console.log(isLoggedin);
    });

    return (
        <>
            {/* <header> */}
            <div className="nav-container">
                <div className="logo">QuizWizz</div>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        {isLoggedin ? (
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            {/* </header> */}
        </>
    );
};

export default Navbar;
