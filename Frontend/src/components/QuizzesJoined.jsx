import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth";

const QuizzesJoined = () => {
  const { userDetails } = useContext(AuthContext);
  const [joined_quizzes, setJoined_quizzes] = useState([]);
  useEffect(() => {
    if (userDetails) {
      setJoined_quizzes(userDetails.participated_quizzes || []);
    }
  }, [userDetails]);
  console.log("in joined");
  console.log(userDetails);
  const list = userDetails.participated_quizzes;
  console.log(list);
  //   setJoined_quizzes(list);
  console.log(joined_quizzes);
  let notEmpty = list.length !== 0;

  return (
    <>
      {notEmpty ? (
        <div className="cards d-flex">
          {joined_quizzes.map((quiz, index) => (
            <div className="participated-card" key={index}>
              <h4 className="name-tag">{quiz.quizname}</h4>
              <p>
                <b>Creator:</b> {quiz.creatorname}{" "}
              </p>
              <p>
                <b>Marks:</b> {quiz.scored_marks}/{quiz.total_marks}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>{"You haven't joined any quizzes yet"}</p>
      )}
    </>
  );
};

export default QuizzesJoined;
