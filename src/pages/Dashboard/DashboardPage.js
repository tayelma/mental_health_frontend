import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";

export default function Dashboard() {
  return (
    <div className="Questionnaire">
      <div className="Questionnaire__sidebar">
        <SideBar />
      </div>
      <div className="Questionnaire__main">
        <div className="Questionnaire__navbar">
          <NavBar />
        </div>
        <div className="Questionnaire__body">
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  );
}
