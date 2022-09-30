import React from "react";
import "./PatientFormPage.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import PatientFormBody from "../../components/PatientFormBody/PatientFormBody";

export default function PatientForm() {
  return (
    <div className="PatientForm">
      <div className="PatientForm__sidebar">
        <SideBar />
      </div>
      <div className="PatientForm__main">
        <div className="PatientForm__navbar">
          <NavBar />
        </div>
        <div className="PatientForm__body">
          <PatientFormBody />
        </div>
      </div>
    </div>
  );
}
