import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/QuizzesCreated.css";
import axios from "axios";
import { useAuth } from "../contexts/auth";
import { BASE_URL } from "../constants";
import CreatedQuizCard from "./CreatedQuizCard";
const QuizzesCreated = () => {
    const { getUserData } = useAuth();
    let user = getUserData();
    let userid = user.userid;
    const [quizzes, setQuizzes] = useState([]);
    const [quizfound, setQuizfound] = useState(true);
    const [state, setState] = useState(true);

    useEffect(() => {
        async function getQuizzes() {
            try {
                let response = await axios.get(
                    `${BASE_URL}/quiz/created/${userid}`
                );
                setQuizzes(response.data.quizzes);
                console.log(response.data);
                console.log(response.data.quizzes);
            } catch (err) {
                console.log(err.response.data);
                setQuizfound(false);
            }
        }
        getQuizzes();
    }, []);
    const deleteQuiz = async (quizid) => {
        console.log(" in delte");
        console.log(quizid);
        console.log(user.userid);
        const data = {
            userid: user.userid,
        };
        try {
            let response = await axios.post(
                `${BASE_URL}/quiz/delete/${quizid}`,
                data
            );
            alert("Deleted Successfully");
            console.log(response.data);
            const newQuizList = quizzes.filter(
                (quiz) => quiz.quizid !== quizid
            );
            setQuizzes(newQuizList);
        } catch (err) {
            console.log(err.response);
        }
    };

    let notEmpty = quizzes.length !== 0;

    return (
        <>
            {notEmpty ? (
                <div className="cards d-flex">
                    {quizzes.map((quiz) => (
                        <CreatedQuizCard
                            Quiz={quiz}
                            key={quiz.quizid}
                            setState={setState}
                            deleteQuiz={deleteQuiz}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-quiz-text">
                    <p>NO QUIZ CREATED YET</p>
                </div>
            )}
            <Link to="/create">
                <button className="create-btn ">
                    <p>Create Quiz</p>
                </button>
            </Link>
        </>
    );
};

export default QuizzesCreated;
