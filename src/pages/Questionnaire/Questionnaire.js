import React from "react";
import "./Questionnaire2.css";
import QuestionsBody from "../../components/QuestionsBody/QuestionsBody";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";

export default function Questionnaire() {
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
          <QuestionsBody />
        </div>
      </div>
    </div>
  );
}
