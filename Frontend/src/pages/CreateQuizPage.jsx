import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./css/CreateQuizPage.css";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import Navbar from "../components/Navbar";
const CreateQuizPage = () => {
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [multipleresponse, setMulitpleresonse] = useState(false);
    // const [showQuestionForm, setShowQuestionForm] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        qtype: "MCQ",
        options: [],
        answer: "",
        marks: 1,
    });
    const { getUserData } = useAuth();
    const user = getUserData();
    const navigate = useNavigate();

    const handleQuestionChange = (e) => {
        setCurrentQuestion({
            ...currentQuestion,
            [e.target.name]: e.target.value,
        });
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions[index] = e.target.value;
        setCurrentQuestion({
            ...currentQuestion,
            options: updatedOptions,
        });
    };

    const handleAddOption = () => {
        setCurrentQuestion({
            ...currentQuestion,
            options: [...currentQuestion.options, ""],
        });
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions.splice(index, 1);
        setCurrentQuestion({
            ...currentQuestion,
            options: updatedOptions,
        });
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            question: "",
            type: "MCQ",
            options: [],
            answer: "",
            marks: 1,
        });
        console.log(questions);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSaveQuiz = async () => {
        // Here you can save the quiz data to your backend or wherever you need
        console.log(user);

        const quizData = {
            name: quizName,
            description: quizDescription,
            questions: questions,
            user: user,
            multiple_responses: multipleresponse,
        };
        console.log(quizData);
        try {
            let response = await axios.post(`${BASE_URL}/quiz/`, quizData);
            console.log(response.data);
            navigate("/profile/created-quizzes");
        } catch (err) {
            console.log("in error");
            console.log(err);
        }
    };
    //TODO: Add validation
    return (
        <>
            <Navbar />

            <div className="main-container">
                <div className="headings-container">
                    <h1>Create Quiz</h1>
                    <hr></hr>
                    <label>
                        <p>Quiz Name:</p>
                        <input
                            type="text"
                            placeholder="Quiz Name"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        <p>Quiz Description:</p>
                        <textarea
                            placeholder="Quiz Description"
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                        />
                    </label>
                    <br />
                    {questions.map((q, index) => (
                        <div className="question-container" key={index}>
                            <h3>Question {index + 1}</h3>
                            <p>Type: {q.type}</p>
                            <p>Question: {q.question}</p>
                            {q.type === "MCQ" && (
                                <>
                                    {/* <p>Options:</p> */}
                                    <ul>
                                        {q.options.map((option, i) => (
                                            <ul>
                                                Option{i + 1}:
                                                <li key={i}>{option}</li>
                                            </ul>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <p>Answer: {q.answer}</p>
                            <p>Marks: {q.marks}</p>
                            <button onClick={() => handleRemoveQuestion(index)}>
                                Remove Question
                            </button>
                        </div>
                    ))}
                    <div className="question-container">
                        {/* <h3>Add New Question</h3> */}
                        <hr className="hr_line"></hr>
                        <br />
                        <label className="que_type">
                            <span>Question Type:</span>
                            <select
                                name="type"
                                value={currentQuestion.type}
                                onChange={handleQuestionChange}
                            >
                                <option value="MCQ">Multiple Choice</option>
                                <option value="LA">Long Answer</option>
                                <option value="SA">Short Answer</option>
                            </select>
                        </label>
                        <label className="inp">
                            Question:
                            <input
                                type="text"
                                name="question"
                                placeholder="Untitled Question"
                                value={currentQuestion.question}
                                onChange={handleQuestionChange}
                            />
                        </label>
                        <br />
                        {currentQuestion.type === "MCQ" && (
                            <>
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <div
                                            key={index}
                                            className="option-container d-flex"
                                        >
                                            <div>
                                                <label>
                                                    Option {index + 1}:
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <button
                                                    className="remove"
                                                    onClick={() =>
                                                        handleRemoveOption(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove Option
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                                <button
                                    onClick={handleAddOption}
                                    className="aditya"
                                >
                                    Add Option
                                </button>
                            </>
                        )}
                        <br />
                        {/* {currentQuestion.type !== 'MCQ' && ( */}
                        <label className="inp">
                            Answer Option:
                            <input
                                type="text"
                                name="answer"
                                value={currentQuestion.answer}
                                onChange={handleQuestionChange}
                            />
                        </label>
                        <br />
                        <label>
                            Marks:
                            <input
                                type="number"
                                name="marks"
                                value={currentQuestion.marks}
                                onChange={handleQuestionChange}
                            />
                        </label>
                        <br />
                        <button onClick={handleAddQuestion} className="AddQn">
                            Add Question
                        </button>
                    </div>
                    <hr></hr>
                    <button class="save-button" onClick={handleSaveQuiz}>
                        Save Quiz
                    </button>
                </div>
                {/* <br />
    <br />
    <Link to="/"><button>Back to Home</button></Link> */}
            </div>
        </>
    );
};

export default CreateQuizPage;
