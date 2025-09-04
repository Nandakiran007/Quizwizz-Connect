import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./css/QuizzesCreated.css";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../contexts/Auth";

import CreatedQuizCard from "./CreatedQuizCard";
const QuizzesCreated = () => {
  const { getUserData } = useContext(AuthContext);
  let userid = getUserData().userid;
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      try {
        let response = await axiosInstance.get(`/quiz/created/${userid}`);
        setQuizzes(response.data.quizzes);
        console.log(response.data);
        console.log(response.data.quizzes);
      } catch (err) {
        console.log(err.response.data);
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
      let response = await axiosInstance.post(`/quiz/delete/${quizid}`, data);
      alert("Deleted Successfully");
      console.log(response.data);
      const newQuizList = quizzes.filter((quiz) => quiz.quizid !== quizid);
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
