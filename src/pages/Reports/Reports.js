import React from "react";
import "./Reports.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import ReportsBody from "../../components/ReportsBody/ReportsBody";

export default function Reports() {
  return (
    <div className="Reports">
      <div className="Reports__sidebar">
        <SideBar />
      </div>
      <div className="Reports__main">
        <div className="Reports__navbar">
          <NavBar />
        </div>
        <div className="Reports__body">
          <ReportsBody />
        </div>
      </div>
    </div>
  );
}
