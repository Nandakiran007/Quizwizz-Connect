import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
const CreatedQuizCard = ({ Quiz, setState, deleteQuiz }) => {
    const { user } = useAuth();
    const [quiz, setQuiz] = useState(Quiz);
    const navigate = useNavigate();
    const [refresh,setRefresh]=useState(false);
    const startQuiz = async (quizid) => {
        try {
            let response = await axios.patch(
                `${BASE_URL}/quiz/start/${quizid}`
            );
            alert(response.data.message);
            setRefresh(!refresh);
        } catch (err) {
            console.log(err.response.data.message);
        }
    };
    const endQuiz = async (quizid) => {
        try {
            let response = await axios.patch(`${BASE_URL}/quiz/end/${quizid}`);
            alert(response.data.message);
            setRefresh(!refresh);
        } catch (err) {
            console.log(err.response.data.message);
        }
    };
    const viewResults = async (quizid) => {
        navigate(`/results/${quizid}`);
    };

    return (
        <>
            <div className="card ">
                <br />
                <h4 className="quiz-name-tag">{Quiz.name}</h4>
                <p>
                    <b>Quiz ID: </b>
                    {Quiz.quizid}
                </p>
                <p>
                    <b>No of Participants:</b>
                    {Quiz.participants.length}
                </p>
                <p>
                    <b>No of Questions: </b>
                    {Quiz.questions_list.length}
                </p>

                {Quiz.isEnded ? (
                    <>
                        <button
                            className="class_b"
                            onClick={() => viewResults(Quiz.quizid)}
                        >
                            View Results{" "}
                        </button>
                        <button
                            className="class_b"
                            onClick={() => startQuiz(Quiz.quizid)}
                        >
                            {" "}
                            Continue Responses
                        </button>
                    </>
                ) : !Quiz.isStarted ? (
                    <button
                        className="for_margin class_b"
                        onClick={() => startQuiz(Quiz.quizid)}
                    >
                        Start Quiz
                    </button>
                ) : (
                    <button
                        className="for_margin class_b"
                        onClick={() => endQuiz(Quiz.quizid)}
                    >
                        Stop Quiz
                    </button>
                )}
                <button
                    className="class_b"
                    onClick={() => deleteQuiz(Quiz.quizid)}
                >
                    Delete Quiz
                </button>
            </div>
        </>
    );
};

export default CreatedQuizCard;
