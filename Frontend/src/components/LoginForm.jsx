import { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [warnText, setWarnText] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setWarnText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
    try {
      let response = await axiosInstance.post(`/auth/login`, formData);
      login(response.data.token);
      //console.log(response.data);

      navigate("/");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setWarnText(err.response.message);
    }
  };

  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button className="btnPadding" >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
