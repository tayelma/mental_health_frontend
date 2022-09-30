import React from "react";
import "./Recommendations.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import RecommendationsBody from "../../components/RecommendationsBody/RecommendationsBody";

export default function Recommendations() {
  return (
    <div className="Recommendations">
      <div className="Recommendations__sidebar">
        <SideBar />
      </div>
      <div className="Recommendations__main">
        <div className="Recommendations__navbar">
          <NavBar />
        </div>
        <div className="Recommendations__body">
          <RecommendationsBody />
        </div>
      </div>
    </div>
  );
}
