import React from "react";
import "./SadPersonsScale.css";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import SadPersonsScaleBody from "../../components/SadPersonsScaleBody/SadPersonsScaleBody";

export default function SadPersonsScale() {
  return (
    <div className="SadPersonsScale">
      <div className="SadPersonsScale__sidebar">
        <SideBar />
      </div>
      <div className="SadPersonsScale__main">
        <div className="SadPersonsScale__navbar">
          <NavBar />
        </div>
        <div className="SadPersonsScale__body">
          <SadPersonsScaleBody />
        </div>
      </div>
    </div>
  );
}
