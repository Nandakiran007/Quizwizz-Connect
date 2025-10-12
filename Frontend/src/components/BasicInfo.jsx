import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

const BasicInfo = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="profile_2">
        <div className="user_name">
          <p>{user.name}</p>
        </div>
        <div className="user_details">
          <p className="user_id">
            <b>User Id</b>
            <br />
            {user.userid}
          </p>
          <p className="user_email">
            <b>Email id </b>
            <br />
            {user.email}
          </p>
        </div>

        <div className="row1">
          <div className="details"></div>
          <div className="rows_flex">
            <div className="row2">
              <p>Quizzes participated</p>
              <b>{user.participated_quizzes.length}</b>
            </div>
            <div className="row3">
              <p>Quizzes Created</p>
              <b>{user.created_quizzes.length}</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BasicInfo;
