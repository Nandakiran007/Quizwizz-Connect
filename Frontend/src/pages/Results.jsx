import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./css/Results.css";

import Navbar from "../components/Navbar";
const Results = () => {
  const { quizid } = useParams();
  const [oneStateVar, setOneStateVar] = useState({
    isLoading: true,
    quizResults: null,
  });
  const navigate = useNavigate();
  // const [isLoading,setIsLoading]=useState(true)
  // const [quizResults, setQuizResults] = useState()
  useEffect(() => {
    const fetchResults = async () => {
      if (!quizid) {
        navigate("/");
      } else {
        try {
          const response = await axiosInstance.get(`/exam/results/${quizid}`);
          console.log(response.data);
          //setQuizResults(response.data);
          //setIsLoading(false);
          setOneStateVar({
            ...oneStateVar,
            isLoading: false,
            quizResults: response.data,
          });
        } catch (err) {
          console.log("error while fetching results");
          setOneStateVar({
            ...oneStateVar,
            isLoading: false,
          });
        }
      }
    };
    fetchResults();
  }, []);
  return (
      <>
          {oneStateVar.isLoading ? (
              <div className="loading-screen">
                  <p className="loading-text">Loading Results...</p>
              </div>
          ) : (
              <>
                  <Navbar />
                  <section className="results-container">
                      <div className="results-card">
                          <header className="results-header">
                              <h1 className="results-title">Quiz Results</h1>
                              <div className="quiz-meta">
                                  <p className="quiz-name">
                                      <strong>Quiz Name:</strong>{" "}
                                      {oneStateVar.quizResults.quizname}
                                  </p>
                                  <p className="quiz-creator">
                                      <strong>Creator:</strong>{" "}
                                      {oneStateVar.quizResults.creator}
                                  </p>
                              </div>
                          </header>

                          <div className="results-content">
                              {(oneStateVar.quizResults?.results &&
                              oneStateVar.quizResults.results.length > 0) ? (
                              <div className="table-wrapper">
                                  <table className="results-table">
                                      <thead>
                                          <tr>
                                              <th>Username</th>
                                              <th>User ID</th>
                                              <th>Score</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {oneStateVar.quizResults?.results?.map(
                                              (result, index) => (
                                                  <tr key={index}>
                                                      <td>{result.username}</td>
                                                      <td>{result.userid}</td>
                                                      <td>
                                                          {result.scored_marks}/
                                                          {result.total_marks}
                                                      </td>
                                                  </tr>
                                              )
                                          )}
                                      </tbody>
                                  </table>
                              </div>
                              ): (
                              <div className="empty-state">
                                  <h2>No participants yet</h2>
                                  <p>
                                      It looks like nobody has attempted this
                                      quiz yet. Once participants complete it,
                                      their scores will appear here.
                                  </p>
                              </div>
                              )}
                          </div>
                      </div>
                  </section>
              </>
          )}
      </>
  );
};

export default Results;
