import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./css/QuizzesCreated.css";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../contexts/Auth";
import { toast } from "react-toastify";
import CreatedQuizCard from "./CreatedQuizCard";
const QuizzesCreated = () => {
    const {
        user: { userid,created_quizzes },
        updateUserData,
    } = useContext(AuthContext);

    const deleteQuiz = async (quizid) => {
        console.log(" in delte");
        console.log(quizid);
        console.log(userid);
        try {
            const response = await axiosInstance.delete(
                `/quiz/delete/${quizid}`
            );
            toast.success("Deleted Successfully");

            const updatedCreatedQuizzesList = created_quizzes.filter(
                (quiz) => quiz.quizid !== quizid
            );
            updateUserData({ created_quizzes: updatedCreatedQuizzesList });
        } catch (err) {
            console.log(err);
            toast.error(err.data.message);
        }
    };

    const updateQuiz = (Quiz) => {
        const updatedCreatedQuizzesList = created_quizzes.map((quiz) =>
            quiz.quizid === Quiz.quizid ? { ...quiz, ...Quiz } : quiz
        );
        updateUserData({ created_quizzes: updatedCreatedQuizzesList });
    };

    const notEmpty = created_quizzes.length !== 0;

    return (
        <div>
            {notEmpty ? (
                <div className="cards d-flex">
                    {created_quizzes.map((quiz) => (
                        <CreatedQuizCard
                            Quiz={quiz}
                            key={quiz.quizid}
                            deleteQuiz={deleteQuiz}
                            updateQuiz={updateQuiz}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-quiz-text">
                    <p>NO QUIZ CREATED YET</p>
                </div>
            )}
            <Link to="/create">
                <button className="create-btn">Create Quiz</button>
            </Link>
        </div>
    );
};

export default QuizzesCreated;
