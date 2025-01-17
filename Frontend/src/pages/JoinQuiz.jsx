import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import axios from "axios";
import "./css/JoinQuiz.css";
import OptionsList from "../components/OptionList";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const JoinQuiz = () => {
    const { quizid } = useParams();

    console.log("quizid in join quiz", quizid);
    const [oneStateVar, setOneStateVar] = useState({
        quizData: {},
        isErr: false,
        questions: [],
        errorText: "default error text",
        isLoading: true,
    });
    const [attempted_list, setAttemptedList] = useState({});
    const { getUserData } = useAuth();
    const user = getUserData();
    const navigate = useNavigate();

    //let [,setIsLoading]=useState(true)
    //const [quizData, setQuizData] = useState();
    //const [questions,setQuestions]=useState();
    //let questions;
    //const [isErr,setisError]=useState(false)
    //const [errorText,setErrorText]=useState()
    // setQuizData(response.data);
    // questions=(quizData.questions_list);
    // setIsLoading(false)

    useEffect(() => {
        const fetchQuiz = async () => {
            console.log("in fetch quiz", quizid);

            try {
                let response = await axios.post(
                    `http://localhost:3000/exam/${quizid}`,
                    {
                        userid: user.userid,
                    }
                );
                console.log("after response");
                console.log(response);
                setOneStateVar({
                    ...oneStateVar,
                    quizData: response.data,
                    questions: response.data.questions_list,
                    isLoading: false,
                });
            } catch (err) {
                console.log(err);
                console.log("after catch response");
                console.log(err.response);
                setOneStateVar({
                    ...oneStateVar,
                    errorText: err.response.data.message,
                    isLoading: false,
                    isErr: true,
                });
                // setisError(true);
                // setErrorText(err.response.data.message);
                // setIsLoading(false);
            }
        };
        fetchQuiz();
    }, []);
    // const { state: { QuizData } } = useLocation();

    //
    const handleQuizSubmit = async () => {
        console.log("quiz submitted");
        console.log(attempted_list);
        try {
            const response = await axios.post(
                `${BASE_URL}/exam/submitExam/${quizid}`,
                {
                    userid: user.userid,
                    username: user.name,
                    attempted_list: attempted_list,
                }
            );
            console.log(response.data);
            navigate("/profile/joined-quizzes");
        } catch (err) {
            console.log(err.response);
            alert("error while submitting");
        }
    };

    return (
        <>
            {oneStateVar.isLoading ? (
                <div> Loading... </div>
            ) : oneStateVar.isErr ? (
                <>
                    <Navbar />
                    <p className="error-text">{oneStateVar.errorText}</p>
                </>
            ) : (
                <>
                    {/* <Helmet><title>QuizPage</title></Helmet> */}
                    <Navbar />
                    <div className="quiz-title">
                        <h1>{oneStateVar.quizData.name}</h1>
                        <h4>{oneStateVar.quizData.description}</h4>
                    </div>
                    <div className="questions">
                        {oneStateVar.questions.map((que, index) => (
                            <div key={index} className="question">
                                <div
                                    key={index}
                                    className="lifeline-container"
                                    name="question"
                                    value={index}
                                >
                                    <p>
                                        <span>{index + 1}</span>
                                        <span>{que.question}</span>
                                    </p>
                                </div>
                                <div className="options-container">
                                    <OptionsList
                                        key={index}
                                        qindex={index}
                                        attempted_list={attempted_list}
                                        setfunc={setAttemptedList}
                                        options={que.options}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="button-container">
                        <button onClick={handleQuizSubmit} className="submit">
                            Submit
                        </button>
                        <br />
                    </div>
                </>
            )}
            {/* <p>{quiz.name}</p> */}
        </>
    );
};

export default JoinQuiz;
