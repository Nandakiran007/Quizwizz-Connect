import { useState } from "react";
import "../components/css/Login.css";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";

const Login = () => {
  const [inlogin, setInlogin] = useState(true);

  const handleToggleClick = () => {
    setInlogin(!inlogin);
  };
  return (
    <>
    <Navbar/>
    <div className="root-container">
      <div className="form-flex">
        <div className="button-box">
          <div>
            <button
              className={`toggle-btn ${!inlogin && "specialBg"}`}
              onClick={handleToggleClick}
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              className={`toggle-btn ${inlogin && "specialBg"} `}
              onClick={handleToggleClick}
            >
              Login
            </button>
          </div>
        </div>

        <div>
          {!inlogin && <SignupForm />}
          {inlogin && <LoginForm />}
        </div>
      </div>
    </div>
    </>
  );
};
export default Login;
