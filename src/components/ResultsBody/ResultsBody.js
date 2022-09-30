import React from "react";
// import PrintIcon from "@mui/icons-material/Print";
import "./ResultsBody2.css";
import "../Chart/BarChart";
import BarChart from "../Chart/BarChart";
import { ArrowRight } from "@mui/icons-material";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsBody() {
  const { results } = useContext(DataContext);

  const navigate = useNavigate();
  const navigateBasedonResult = () => {
    if (labels[percentage.indexOf(Math.max(...percentage))] == "Depression") {
      navigate("/sadpersonsscale");
    } else {
      navigate("/reports");
    }
  };

  //grabbing the highest result
  const labels = [];
  const percentage = [];
  const comorbid = [];

  if (results.jsonData)
    for (const key in results.jsonData.Diagnosis) {
      labels.push(key);
      percentage.push(parseInt(results.jsonData.Diagnosis[key] * 100));

      if (parseInt(results.jsonData.Diagnosis[key] * 100) > 90) {
        comorbid.push(key);
        console.log(comorbid);
      }
    }

  var element = comorbid.join(" , ");
  console.log(element);

  return (
    <div className="ResultsBody">
      <div className="ResultsBody__outlineInner">
        <p className="ResultsBody__title">Diagnosis: </p>
        <p className="ResultsBody__predicted">
          {/* {labels[percentage.indexOf(Math.max(...percentage))]} detected */}
          {element} detected
        </p>
        {/* <PrintIcon className="ResultsBody__printIcon" /> */}
        <div className="ResultsBody__dividingBar"></div>
        <div className="ResultsBody__diagnoseResult">Diagnostic Result:</div>
        <div className="ResultsBody__results">
          <BarChart />
          <button
            className="ResultsBody__nextButton"
            onClick={navigateBasedonResult}
          >
            <p className="ResultsBody__buttonText">Next</p>
            <ArrowRight className="ResultsBody__buttonIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
