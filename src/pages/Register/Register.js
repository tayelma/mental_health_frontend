import React, { useState } from "react";
import MentalSvg from "../../images/mental-health-pic.svg";
import { useNavigate } from "react-router-dom";
import useFullPageLoader from "../../components/QuestionsBody/useFullPageLoader";
import "./Register.css";
import { Female } from "@mui/icons-material";

export default function Register() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [sexState, setSexState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [registerValues, setRegisterValues] = useState({
    firstname: "",
    lastname: "",
    gma_number: "",
    email: "",
    hospital_name: "",
    password: "",
  });

  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.id]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    // setIsLoading((prevState) => !prevState);

    const url =
      "https://eli46zfnxb.execute-api.us-east-1.amazonaws.com/prod/register";

    const payload = {
      firstname: registerValues.firstname,
      lastname: registerValues.lastname,
      email: registerValues.email,
      sex: sexState,
      hospital_name: registerValues.hospital_name,
      hospital_category: categoryState,
      hospital_location: locationState,
      password: registerValues.password,
    };

    console.log(payload);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        hideLoader();
        console.log(data);
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message);
        hideLoader();
      }
    } catch (err) {
      alert(err.message);
      hideLoader();
    }
    // finally {
    //   setIsLoading((prevState) => !prevState);
    // }
  };

  return (
    <div className="Register">
      <div className="Register__logobody">
        <img src={MentalSvg} alt="Mental Health" className="Register__image" />
      </div>
      <div className="Register__form">
        <div className="Register__formbody">
          <div className="Register__heading">Register</div>
          <div className="Register__formOutline">
            <label className="Register__staffID">
              <p>First Name</p>
              <input
                type="text"
                name="name"
                className="staffIdinput"
                id="firstname"
                value={registerValues.firstname}
                onChange={handleChange}
              />
            </label>
            <label className="Register__staffID">
              <p>Last Name</p>
              <input
                type="text"
                name="name"
                className="staffIdinput"
                id="lastname"
                value={registerValues.lastname}
                onChange={handleChange}
              />
            </label>
            {/* change to radio button for male and female */}
            <label className="Register__staffID">
              <p>Sex</p>
              <select
                className="Register__selectSex"
                onChange={(e) => {
                  const sexChosen = e.target.value;
                  setSexState(sexChosen);
                }}
              >
                <option value=""></option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </label>
            <label className="Register__staffID">
              <p>Hospital Name</p>
              <input
                type="text"
                name="name"
                className="staffIdinput"
                id="hospital_name"
                value={registerValues.hospital_name}
                onChange={handleChange}
              />
            </label>
            <label className="Register__staffID">
              <p>Hospital Location</p>
              <select
                className="Register__selectLocation"
                onChange={(e) => {
                  const categoryLocation = e.target.value;
                  setLocationState(categoryLocation);
                }}
              >
                <option value=""></option>
                <option value="Ahafo">Ahafo</option>
                <option value="Ashanti">Ashanti</option>
                <option value="Bono East">Bono East</option>
                <option value="Brong Ahafo">Brong Ahafo</option>
                <option value="Eastern">Eastern</option>
                <option value="Greater Accra">Greater Accra</option>
                <option value="North East">North East</option>
                <option value="Northern">Northernv</option>
                <option value="Oti">Oti</option>
                <option value="Savannah">Savannah</option>
                <option value="Upper East">Upper East</option>
                <option value="Upper West">Upper West</option>
                <option value="Western">Western</option>
                <option value="Western North">Western North</option>
                <option value="Volta">Volta</option>
              </select>
            </label>
            <label className="Register__staffID">
              <p>Hospital Category</p>
              <select
                className="Register__selectCategory"
                onChange={(e) => {
                  const categoryChosen = e.target.value;
                  setCategoryState(categoryChosen);
                }}
              >
                <option value=""></option>
                <option value="General Hospital">General Hospital</option>
                <option value="Private Hospital">Private Hospital</option>
                <option value="Regional Hospital">Regional Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="CHIP Compound">CHIP Compound</option>
              </select>
            </label>
            <label className="Register__staffID">
              <p>Email</p>
              <input
                type="text"
                name="name"
                className="staffIdinput"
                id="email"
                value={registerValues.email}
                onChange={handleChange}
              />
            </label>
            <label className="Register__password">
              <p>Password</p>
              <input
                type="password"
                name="name"
                className="passwordInput"
                id="password"
                value={registerValues.password}
                onChange={handleChange}
              />
            </label>
            <label className="Register__password">
              <p>Confirm Password</p>
              <input type="password" name="name" className="passwordInput" />
            </label>

            <div className="Register__spaceBetween"></div>
            <div className="Register__buttonGroup">
              <button
                type="submit"
                className="Register__loginButton"
                onClick={navigateToLoginPage}
              >
                Login
              </button>
              <div className="Register__space"></div>
              <button
                type="submit"
                className="Register__registerButton"
                onClick={handleSubmit}
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
