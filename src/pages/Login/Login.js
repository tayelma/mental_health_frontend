import React, { useContext, useState } from "react";
import MentalSvg from "../../images/mental-health-pic.svg";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LoginContext } from "../../context/LoginContext";
import useFullPageLoader from "../../components/QuestionsBody/useFullPageLoader";

function Login() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const { setLogin } = useContext(LoginContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    setIsLoading((prevState) => !prevState);

    const url =
      "https://eli46zfnxb.execute-api.us-east-1.amazonaws.com/prod/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // alert(data.message);
        localStorage.setItem("token", data.token);
        hideLoader();
        navigate("/patient");
        setLogin(data);
      } else {
        const data = await res.json();
        alert(data.message);
        hideLoader();
      }
    } catch (err) {
      alert(err.message);
      hideLoader();
    } finally {
      setIsLoading((prevState) => !prevState);
    }
  };

  const navigate = useNavigate();

  const navigateToRegistrationPage = () => {
    navigate("/register");
  };

  return (
    <div className="Login">
      <div className="Login__logobody">
        <img src={MentalSvg} alt="Mental Health" className="Login__image" />
      </div>
      <div className="Login__form">
        <div className="Login__formbody">
          <div className="Login__heading">Login</div>
          <div className="Login__formOutline">
            <label className="Login__staffID">
              Email
              <input
                id="email"
                type="email"
                name="name"
                className="staffIdinput"
                value={values.email}
                onChange={handleChange}
              />
            </label>
            <div className="Login__spaceBetween"></div>
            <label className="Login__password">
              Password
              <input
                id="password"
                type="password"
                name="name"
                className="passwordInput"
                value={values.password}
                onChange={handleChange}
              />
            </label>
            <div className="Login__spaceBetween"></div>
            <p className="Login__forgotPassword">Forgot Password?</p>
            <div className="Login__spaceBetween"></div>

            <div className="Login__buttonGroup">
              <button
                type="submit"
                className="Login__loginButton"
                onClick={handleSubmit}
              >
                Login
              </button>
              <div className="Login__space"></div>
              <button
                type="submit"
                className="Login__registerButton"
                onClick={navigateToRegistrationPage}
                disabled={isLoading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </div>
  );
}

export default Login;
