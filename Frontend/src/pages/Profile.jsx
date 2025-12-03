import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import { IoIosLogOut } from "react-icons/io";

import "./css/Profile.css";

const SidebarOption = ({ to, label, icon }) => (
  <NavLink to={to}>
    <div className="sidebar_option">
      <div className="navitem">
        <p>
          {label} {icon}
        </p>
      </div>
    </div>
  </NavLink>
);

const Profile = () => {
  const { updateUserData, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserDetails = async (userid) => {
      try {
        console.log("in getuserdetails");
        console.log(`userid:${userid}`);
        const response = await axiosInstance.get("/auth/user");
        console.log("fetched", response.data);
        const details = response.data;
        const userinfo = {
          name: details.name,
          email: details.email,
          userid: details.userid,
          created_quizzes: details.created_quizzes,
          participated_quizzes: details.participated_quizzes,
        };
        updateUserData(userinfo);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("in profile useeffect", user);
    getUserDetails(user.userid);
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-box d-flex">
        <div className="sidebar">
          <div className="sidebar_options">
            <SidebarOption to="/profile" label="Profile" />
            <SidebarOption to="created-quizzes" label="Quizzes Created" />
            <SidebarOption to="joined-quizzes" label="Quizzes Participated" />
            <SidebarOption
              to="/logout"
              label="Log Out"
              icon={<IoIosLogOut />}
            />
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

export default Profile;
