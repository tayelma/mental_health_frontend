import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResultsBody from "../../components/ResultsBody/ResultsBody";
import SideBar from "../../components/SideBar/SideBar";
// import "./Results.css";
import "./Results2.css";

export default function Results() {
  return (
    <div className="Results">
      <div className="Results__sideBar">
        <SideBar />
      </div>
      <div className="Results__main">
        <div className="Results__navbar">
          <NavBar />
        </div>
        <div className="Results__body">
          <ResultsBody />
        </div>
      </div>
    </div>
  );
}
