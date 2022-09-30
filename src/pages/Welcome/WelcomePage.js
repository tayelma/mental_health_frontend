import React from "react";
import "./WelcomePage.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import WelcomeBody from "../../components/WelcomeBody/WelcomeBody";

export default function Welcome() {
  return (
    <div className="Welcome">
      <div className="Welcome__sidebar">
        <SideBar />
      </div>
      <div className="Welcome__main">
        <div className="Welcome__navbar">
          <NavBar />
        </div>
        <div className="Welcome__body">
          <WelcomeBody />
        </div>
      </div>
    </div>
  );
}
