import { ArrowRight } from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import "./WelcomeBody.css";
import { Instructions } from "./Instructions";

export default function WelcomeBody() {
  const login = useContext(LoginContext);
  return (
    <div className="WelcomeBody">
      <div className="WelcomeBody__outlineInner">
        <p className="WelcomeBody__predicted"></p>
        <div className="WelcomeBody__dividingBar"></div>
        <div className="WelcomeBody__diagnoseResult">Instructions for use:</div>
        <div className="WelcomeBody__results">
          <ul style={{ padding: 10 }}>
            {Instructions.map((recomendation, i) => {
              return (
                <li className="RecommendationsBody__listRow" key={i}>
                  {recomendation}
                </li>
              );
            })}
          </ul>

          <button
            className="WelcomeBody__nextButton"
            // onClick={navigateBasedonResult}
          >
            <p className="WelcomeBody__buttonText">Next</p>
            <ArrowRight className="WelcomeBody__buttonIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
