import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import './css/Results.css'
import Navbar from '../components/Navbar';
const Results = () => {
  const { quizid } = useParams();
  const [oneStateVar,setOneStateVar]=useState({
    isLoading:true,
    quizResults:null
  })
  // const [isLoading,setIsLoading]=useState(true)
  // const [quizResults, setQuizResults] = useState()
  useEffect(() => {
      const fetchResults = async () => {
          if (!quizid) {
              navigate("/");
          } else {
              try {
                  const response = await axios.get(
                      `http://127.0.0.1:3000/exam/results/${quizid}`
                  );
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
              <p>loading....</p>
          ) : (
              <>
                  <Navbar />
                  <div className="result-root">
                      <div className="result-div">
                          <div className="result-heading">Results</div>
                          <div className="result-data">
                              <div className="about-quiz">
                                  {
                                      <div>
                                          <p>
                                              Quiz Name :{" "}
                                              {oneStateVar.quizResults.quizname}
                                          </p>
                                          <p>
                                              Quiz Creator :{" "}
                                              {oneStateVar.quizResults.creator}
                                          </p>
                                      </div>
                                  }
                              </div>
                              <div className="results-table">
                                  <table className="table">
                                      <thead className="table-head">
                                          <tr>
                                              <th>Username</th>
                                              <th>User ID</th>
                                              <th className="last-th">Score</th>
                                          </tr>
                                      </thead>
                                      <tbody className="table-body">
                                          {oneStateVar.quizResults &&
                                              oneStateVar.quizResults.results &&
                                              oneStateVar.quizResults.results.map(
                                                  (result, index) => (
                                                      <tr key={index}>
                                                          <td>
                                                              {result.username}
                                                          </td>
                                                          <td>
                                                              {result.userid}
                                                          </td>
                                                          <td>
                                                              {
                                                                  result.scored_marks
                                                              }
                                                              /
                                                              {
                                                                  result.total_marks
                                                              }
                                                          </td>
                                                      </tr>
                                                  )
                                              )}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </>
          )}
      </>
  );
}

export default Results