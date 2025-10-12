import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../contexts/Auth";
import Navbar from "../components/Navbar";
import "./css/CreateQuizPage.css";
import { FaTrash,FaTimes,FaCheck } from "react-icons/fa";

const initialQuestionState = {
  question: "",
  qtype: "MCQ",
  options: [""],
  answer: "",
  marks: 1,
};

const OptionField = ({ option, index, onChange, onRemove }) => (
  <div key={index} className="option-container">
    <label>
      Option {index + 1}:
      <input
        type="text"
        value={option}
        placeholder={`Enter option ${index + 1}`}
        onChange={(e) => onChange(e, index)}
      />
      <button
        type="button"
        className="remove-btn"
        aria-label={`Remove option ${index + 1}`}
        onClick={() => onRemove(index)}
      >
        <FaTrash size={22} />
      </button>
    </label>
  </div>
);

const QuestionCard = ({ question, index, onRemove, onEdit }) => (
  <div className="question-card-container" key={index}>
    <h3>Question {index + 1}</h3>
    <p>
      <strong>Type:</strong> {question.qtype}
    </p>
    <p className="question-text">
      <strong>Question:</strong> {question.question}
    </p>

    {question.qtype === "MCQ" && (
      <ul>
        {question.options.map((opt, i) => (
          <div  key={i}>
          <li key={i} className={question.answer==String(i+1)?"correct-option":""} 
          style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}
          >
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <strong>Option {i + 1}:</strong>
            <p>{opt}</p>
            </div>
            {question.answer==String(i+1) && <FaCheck className="correct-icon" />}
          </li>
          
          </div>
        ))}
      </ul>
    )}
     

    <p>
      <strong>{question.qtype === "MCQ" ? "Answer Option" : "Answer"}:</strong>{" "}
      {question.answer}
    </p>
    <p>
      <strong>Marks:</strong> {question.marks}
    </p>

    <div className="button-group">
      <button className="edit-btn" onClick={() => onEdit(index)}>
        Edit
      </button>
      <button className="remove-btn" onClick={() => onRemove(index)}>
        Remove
      </button>
    </div>
  </div>
);

const CreateQuizPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showQuestionCard, setShowQuestionCard] = useState(true); // toggle for question input

  const handleQuestionChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleOptionChange = useCallback((e, index) => {
    const { value } = e.target;
    setCurrentQuestion((prev) => {
      const updated = [...prev.options];
      updated[index] = value;
      return { ...prev, options: updated };
    });
  }, []);

  const handleAddOption = useCallback(() => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  }, []);

  const handleRemoveOption = useCallback((index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  }, []);

  const handleAddOrUpdateQuestion = useCallback(() => {
    const { question, qtype, options, answer } = currentQuestion;

    if (!question.trim()) return toast.error("Question cannot be empty");
    if (qtype === "MCQ" && options.length < 2)
      return toast.error("MCQ must have at least 2 options");

    if (qtype === "MCQ") {
      const answerNum = Number(answer);
      if (
        !Number.isInteger(answerNum) ||
        answerNum <= 0 ||
        answerNum > options.length
      ) {
        return toast.error(
          `Answer Option must be a valid number between 1 and ${options.length}`
        );
      }
    } else {
      if (!answer.trim()) return toast.error("Please provide an answer");
    }

    if (editIndex !== null) {
      setQuestions((prev) =>
        prev.map((q, i) => (i === editIndex ? currentQuestion : q))
      );
      toast.success("Question updated successfully!");
      setEditIndex(null);
    } else {
      setQuestions((prev) => [...prev, currentQuestion]);
      toast.success("Question added successfully!");
    }

    setCurrentQuestion(initialQuestionState);
    setShowQuestionCard(false); // hide after adding
  }, [currentQuestion, editIndex]);

  const handleRemoveQuestion = useCallback((index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    toast.info("Question removed");
  }, []);

  const handleEditQuestion = useCallback(
    (index) => {
      setCurrentQuestion(questions[index]);
      setEditIndex(index);
      setShowQuestionCard(true); // show card for editing
      window.scrollTo({ top: 600, behavior: "smooth" });
    },
    [questions]
  );

  const handleSaveQuiz = async () => {
    if (!quizName.trim()) return toast.error("Please give a name to the quiz");
    if (questions.length === 0)
      return toast.error("Please add at least one question");

    const quizData = {
      name: quizName,
      description: quizDescription,
      questions,
      user,
    };

    try {
      setLoading(true);
      await axiosInstance.post("/quiz/", quizData);
      toast.success("Quiz saved successfully!");
      navigate("/profile/created-quizzes");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save quiz. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(questions);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="headings-container">
          <h1>Create Quiz</h1>
          <hr />

          <label>
            <p>Quiz Name:</p>
            <input
              type="text"
              placeholder="Quiz Name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </label>

          <label>
            <p>Quiz Description:</p>
            <textarea
              placeholder="Quiz Description"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </label>

          {questions.map((q, index) => (
            <QuestionCard
              key={index}
              question={q}
              index={index}
              onRemove={handleRemoveQuestion}
              onEdit={handleEditQuestion}
            />
          ))}

          {/* Add Question Button */}
          {!showQuestionCard && (
            <button
              type="button"
              className="add-question-btn"
              onClick={() => setShowQuestionCard(true)}
            >
              + Add Question
            </button>
          )}

          {/* Question Input Card */}
          {showQuestionCard && (
            <div className="question-container active">
              <div className="question-card-header">
                <h3>{editIndex !== null ? "Edit Question" : "Add Question"}</h3>
                <button
                  type="button"
                  className="close-btn"
                  aria-label="Close question form"
                  onClick={() => {
                    setShowQuestionCard(false);
                    setEditIndex(null);
                    setCurrentQuestion(initialQuestionState);
                  }}
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <hr className="hr_line" />

              <label>
                <span>Question Type:</span>
                <select
                  name="qtype"
                  value={currentQuestion.qtype}
                  onChange={handleQuestionChange}
                  style={{ width: "20%" }}
                >
                  <option value="MCQ">Multiple Choice</option>
                  <option value="LA">Long Answer</option>
                  <option value="SA">Short Answer</option>
                </select>
              </label>

              <label>
                Question:
                <input
                  type="text"
                  name="question"
                  placeholder="Enter your question"
                  value={currentQuestion.question}
                  onChange={handleQuestionChange}
                />
              </label>

              {currentQuestion.qtype === "MCQ" && (
                <>
                  {currentQuestion.options.map((opt, index) => (
                    <OptionField
                      key={index}
                      option={opt}
                      index={index}
                      onChange={handleOptionChange}
                      onRemove={handleRemoveOption}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="add-option-btn"
                  >
                    + Add Option
                  </button>
                </>
              )}

              <label>
                {currentQuestion.qtype === "MCQ" ? "Answer Option" : "Answer"}:
                <input
                  type="text"
                  name="answer"
                  placeholder="Correct answer"
                  value={currentQuestion.answer}
                  onChange={handleQuestionChange}
                />
              </label>

              <label >
                Marks:
                <input
                  type="number"
                  name="marks"
                  min="1"
                  value={currentQuestion.marks}
                  onChange={handleQuestionChange}
                />
              </label>

              <button
                type="button"
                onClick={handleAddOrUpdateQuestion}
                className="save-question-btn"
                disabled={loading}
                style={{width:"20%",minWidth:"120px",maxWidth:"200px"}}
              >
                {editIndex !== null ? "Update Question" : "Save Question"}
              </button>
            </div>
          )}

          <hr />
          <p>Total Questions: {questions.length}</p>

          <button
            className="save-quiz-btn"
            onClick={handleSaveQuiz}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateQuizPage;
