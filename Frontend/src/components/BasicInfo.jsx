import React from "react";
import { useAuth } from "../contexts/auth";

const BasicInfo = () => {
    const { userDetails } = useAuth();
    return (
        <>
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
                    <div className="details"></div>
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
        </>
    );
};
export default BasicInfo;
