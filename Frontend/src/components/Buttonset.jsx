import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Buttonset.css";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Buttonset = () => {
    const navigate = useNavigate();
    const [QuizId, setQuizId] = useState("");
    const [warningText, setWarningText] = useState("");
    const { isLoggedin, getUserData } = useAuth();
    const user = getUserData();

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setWarningText("");
        setQuizId(e.target.value);
    };

    const handleJoin = async (e) => {
        if (!isLoggedin) {
            navigate("/login");
        }
        let isEmpty = !QuizId;
        console.log(`isEmpty:${isEmpty}`);
        if (isEmpty) {
            setWarningText("Please enter the Quiz ID");
        } else {
            let isValidQuizid = true; //TODO: write isvalid function
            isValidQuizid
                ? navigate(`/join/${QuizId}`)
                : setWarningText(err.response.data.message);
        }
    };

    return (
        <div className="outer-div-buttons">
            <div className="buttons">
                <div className="item item1 mx-4">
                    <Link to="/create">
                        <button className="Home_button">
                            <p className="white_p">Create Quiz</p>
                        </button>
                    </Link>
                </div>

                <div className="item item2 mx-4">
                    <div className="right-box">
                        <div className="input-div">
                            <input
                                type="text"
                                value={QuizId}
                                onChange={handleInputChange}
                                maxLength={5}
                                className="navbarBg"
                            />

                            <button
                                onClick={handleJoin}
                                className="Home_button"
                            >
                                <p className="white_p">Join</p>
                            </button>
                        </div>
                        <p id="warning-text">{warningText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buttonset;
