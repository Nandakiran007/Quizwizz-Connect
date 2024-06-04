import React from "react";
import { useAuth } from "../contexts/auth";

const BasicInfo = () => {
    const { userDetails } = useAuth();
    return (
        <>
            {/* <div className="profile_2">
        <p>Manoj Kumar Mylapalli | AP21110011472</p>
        <div className="hr-container">
        </div>
        <div className="user_details">
            <p className="user_name"><b>Username : </b>{user.name}</p>
            <p className="user_id"><b>Password : </b>{user.userid}</p>
        </div>
      </div> */}
            <div className="profile_2">
                <div className="user_name">
                    <p>{userDetails.name}</p>
                </div>
                <div className="user_details">
                    <p className="user_id">
                        <b>User Id</b>
                        <br />
                        {userDetails.userid}
                    </p>
                    <p className="user_email">
                        <b>Email id </b>
                        <br />
                        {userDetails.email}
                    </p>
                </div>

                <div className="row1">
                    <div className="details">
                        {/* <p>Institution</p>
                <a href="#"><b>SRM UNIVERSITY AP</b></a> */}
                    </div>
                    <div className="rows_flex">
                        <div className="row2">
                            <p>Quizzes participated</p>
                            <b>{userDetails.participated_quizzes.length}</b>
                        </div>
                        <div className="row3">
                            <p>Quizzes Created</p>
                            <b>{userDetails.created_quizzes.length}</b>
                        </div>
                    </div>
                </div>
            </div>
            {/* <p>No of Quizzes Particpated:4</p> */}
            {/* <p>No of Quizzes Joined:4</p> */}
        </>
    );
};
export default BasicInfo;
