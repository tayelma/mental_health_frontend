import React, { useContext } from "react";
import "./ReccomendationsBody.css";
import { rec } from "./RecommendationsList";
import { DataContext } from "../../context/DataContext";
import { SadPersonContext } from "../../context/SadPersonContext";

export default function RecommendationsBody() {
  const disorders = [
    "Depression",
    "Anxiety",
    "Schizophrenia",
    "SubstanceAbuse",
    "Bipolar",
    "Undetected",
  ];

  const { results } = useContext(DataContext);

  const { sadPerson } = useContext(SadPersonContext);

  let labels = [];
  let percentage = [];

  if (results.jsonData)
    for (const key in results.jsonData.Diagnosis) {
      labels.push(key);
      percentage.push(parseInt(results.jsonData.Diagnosis[key] * 100));
    }

  const index = percentage.indexOf(Math.max(...percentage));

  const Detected = disorders[index];
  // const Detected = "Bipolar";

  //get the index and associate the value with the disorder
  console.log(Math.max(...percentage));
  console.log(percentage.indexOf(Math.max(...percentage)));
  const disorder = labels[percentage.indexOf(Math.max(...percentage))];
  // console.log(disorder);
  console.log(Detected);

  const referralOption = () => {
    if (
      Detected === "Schizophrenia" ||
      Detected === "Bipolar" ||
      Detected === "Substance Abuse"
    ) {
      return "PSYCHIATRIST";
    } else if (Detected === "Anxiety") {
      return "PSYCHOLOGIST";
    } else if (Detected === "Depression") {
      return "PSYCHOLOGIST and PSYCHIATRIST";
    } else if (Detected == "Undetected") {
      return "No referral Option";
    } else {
      return "PSYCHIATRIST";
    }
  };

  console.log(referralOption());
  console.log(sadPerson);

  return (
    <div className="RecommendationsBody">
      <p className="RecommendationsBody__heading">
        Recommendations for management: {Detected}
      </p>
      <div className="RecommendationsBody__body">
        <ul className="RecommendationsBody__list">
          {rec[Detected].map((recomendation, i) => {
            return (
              <li className="RecommendationsBody__listRow" key={i}>
                {recomendation}
              </li>
            );
          })}
        </ul>
        <div className="RecommendationsBody__referral">
          <p className="RecommendationsBody__referalOption">
            Referral To: {referralOption()}
          </p>
        </div>
        {/* <button className="RecommendationsBody__button">
          <p className="RecommendationsBody__buttonText">End Process</p>
        </button> */}
      </div>
    </div>
  );
}
