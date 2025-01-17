import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { NavLink, Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { BASE_URL } from "../constants";
import "./css/Profile.css";
const profile = () => {
    const { setUserDetails, getUserData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getUserDetails = async (userid) => {
            try {
                console.log("in getuserdetails");
                console.log(`userid:${userid}`);
                const response = await axios.get(`${BASE_URL}/auth/${userid}`);
                console.log("fetched");
                const details = response.data;
                const userinfo = {
                    name: details.name,
                    email: details.email,
                    userid: details.userid,
                    created_quizzes: details.created_quizzes,
                    participated_quizzes: details.participated_quizzes,
                };
                setUserDetails(() => {
                    return userinfo;
                });
                setIsLoading(false);
                // console.log(userinfo.participated_quizzes);
            } catch (err) {
                console.log(err);
            }
        };
        const user = getUserData();
        getUserDetails(user.userid);
    }, []);

    return (
        <>
            <Navbar />
            <div className="main-box d-flex">
                {/* <div className="side-navbar d-flex flex-column">
    </div> */}
                <div className="sidebar">
                    <div className="sidebar_options">
                        <NavLink to="/profile">
                            <div className="sidebar_option1 sidebar_option">
                                {" "}
                                <div className="navitem">
                                    <p>Profile</p>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="created-quizzes">
                            <div className="sidebar_option2 sidebar_option">
                                {" "}
                                <div className="navitem">
                                    <p>Quizzes Created</p>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="joined-quizzes">
                            <div className="sidebar_option3 sidebar_option">
                                {" "}
                                <div className="navitem">
                                    <p>Quizzes Participated</p>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="/logout">
                            <div className="sidebar_option4 sidebar_option">
                                {" "}
                                <div className="navitem">
                                    <p>
                                        Log Out <IoIosLogOut />
                                    </p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading......</p>
                ) : (
                    <div className="outlet-div flex-grow-1">
                        <Outlet />
                    </div>
                )}
            </div>
        </>
    );
};

export default profile;
