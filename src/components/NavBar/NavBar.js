import React from "react";
// import "./NavBar.css";
import "./NavBar2.css";
import { useContext } from "react";
import { Add, Logout } from "@mui/icons-material";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function NavBar() {
  const { login } = useContext(LoginContext);

  const navigate = useNavigate();

  const navigateToNextPage = () => {
    navigate("/login");
  };

  // console.log(login.user.firstName);
  return (
    <div className="NavBar">
      <button type="button" className="NavBar__button">
        <div className="NavBar__buttonIcon">
          <Add />
        </div>
        <p className="NavBar__buttonText">New Diagnosis</p>
      </button>
      <div className="NavBar__action">
        Logout
        <IconButton
          color="primary"
          onClick={() => {
            {
              navigateToNextPage();
            }
          }}
        >
          <Logout />
        </IconButton>
        {/* this should show the logged in user */}
        <>
          <p>
            Dr.{" "}
            {login.user && login.user.firstName ? (
              login.user.firstName
            ) : (
              <div></div>
            )}
          </p>
        </>
      </div>
    </div>
  );
}
