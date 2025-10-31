import { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/Auth";
const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    userid: "",
    password: "",
  });
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Process form submission here
    console.log(formData);
    try {
      let response = await axiosInstance.post(`/auth/signup`, formData);

      // console.log("user create successfully");
      console.log(response.data.message);
      console.log(response.data.token);
      console.log("before token");
      login(response.data.token);
      navigate("/");
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data);
      setWarnText(err.response.data.message);
    }
    //let resjson= await response.json()
  };

  // Function to handle changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setWarnText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h1>Sign Up</h1> */}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userid">Userid</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {warnText && <p style={{ color: "red" }}>{warnText}</p>}
        <button className="btnPadding" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
