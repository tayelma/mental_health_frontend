import React from "react";
import { SideBarData } from "./SideBarData";
import "./SideBar2.css";
import MentalHealthSvg from "../../images/mental-health-pic.svg";

export default function SideBar() {
  return (
    <div className="SideBar">
      <div className="SideBar__content">
        <ul className="SideBar__list">
          {/* <div className="SideBar__image">
            <img src={MentalHealthSvg} alt="Mental Health" />
          </div> */}
          {SideBarData.map((val, key) => {
            return (
              <li
                className="SideBar__row"
                key={key}
                id={window.location.pathname === val.link ? "active" : "null"}
                onClick={() => {
                  // if (key === 0) return;
                  window.location.pathname = val.link;
                }}
              >
                {" "}
                {""}
                <div id="SideBar__icon">{val.icon}</div> {""}
                <div id="SideBar__title">{val.title}</div> {""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    // <div className="sidebar">
    //   <div className="content">
    //     <ul className="SideBarList">
    //       {SideBarData.map((val, key) => {
    //         return (
    //           <li
    //             className="row"
    //             key={key}
    //             id={window.location.pathname === val.link ? "active" : "null"}
    //             onClick={() => {
    //               window.location.pathname = val.link;
    //             }}
    //           >
    //             {" "}
    //             {""}
    //             <div id="icon">{val.icon}</div> {""}
    //             <div id="title">{val.title}</div> {""}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </div>
  );
}
