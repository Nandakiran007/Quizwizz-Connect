import { useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { Link } from "react-router-dom";
import "./css/Buttonset.css";
import { useNavigate } from "react-router-dom";
const Buttonset = () => {
  const navigate = useNavigate();
  const [QuizId, setQuizId] = useState("");
  const [warningText, setWarningText] = useState("");
  const { isLoggedin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setWarningText("");
    setQuizId(e.target.value);
  };

  const handleJoin = async () => {
    if (!isLoggedin) {
      navigate("/login");
    }
    let isEmpty = !QuizId;
    console.log(`isEmpty:${isEmpty}`);
    if (isEmpty) {
      setWarningText("Please enter the Quiz ID");
    } else {
      let isValidQuizid = QuizId.length>3; //TODO: write isvalid function
      isValidQuizid
        ? navigate(`/join/${QuizId}`)
        : setWarningText('Quiz ID should be at least 4 characters long');
    }
  };

  return (
    <div className="outer-div-buttons">
      <div className="home-buttons">
        <div>
          <Link to="/create" style={{textDecoration: 'none'}}>
            <button className="Home_button button-set-item">
              <p className="cta-color ">Create Quiz</p>
            </button>
          </Link>
        </div>
        <div>
        <div className="d-flex">
          <div className="input-div">
            <input
              type="text"
              value={QuizId}
              onChange={handleInputChange}
              maxLength={5}
              className="navbarBg"
            />
          </div>
          <button onClick={handleJoin} className="Home_button button-set-item joinBtn">
            <p className="cta-color ">Join</p>
          </button>
        </div>
        <p id="warning-text">{warningText}</p>
        </div>
      </div>
    </div>
  );
};

export default Buttonset;
