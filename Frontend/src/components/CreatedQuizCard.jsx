import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreatedQuizCard = ({ Quiz, deleteQuiz, updateQuiz }) => {
    const navigate = useNavigate();
    const startQuiz = async (quizid) => {
        try {
            const response = await axiosInstance.patch(`/quiz/start/${quizid}`);
            console.log("res", response);
            toast.success(response.data.message);
            updateQuiz(response.data.quiz);
        } catch (err) {
            console.log(err.data);
        }
    };
    const endQuiz = async (quizid) => {
        try {
            const response = await axiosInstance.patch(`/quiz/end/${quizid}`);
            console.log("res", response);
            toast.success(response.data.message);
            updateQuiz(response.data.quiz);
        } catch (err) {
            console.log(err);
            console.log(err.data.message);
        }
    };
    const viewResults = async (quizid) => {
        navigate(`/results/${quizid}`);
    };

    return (
        <div className="card">
            <h4 className="quiz-name-tag">{Quiz.name}</h4>
            <p>
                <b>Quiz ID: </b>
                {Quiz.quizid}
            </p>
            <p>
                <b>No of Participants:</b>
                {Quiz.participantsCount}
            </p>
            <p>
                <b>No of Questions: </b>
                {Quiz.questionsCount}
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
            <button className="class_b" onClick={() => deleteQuiz(Quiz.quizid)}>
                Delete Quiz
            </button>
        </div>
    );
};

export default CreatedQuizCard;
