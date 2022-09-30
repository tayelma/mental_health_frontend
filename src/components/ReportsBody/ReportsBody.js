import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { PatientDataContext } from "../../context/PatientDataContext";
import { DataContext } from "../../context/DataContext";
import { SadPersonContext } from "../../context/SadPersonContext";
import { useNavigate } from "react-router-dom";
import { rec } from "../RecommendationsBody/RecommendationsList";
import "./ReportsBody.css";
import { SymptomsContext } from "../../context/SymptomsContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  fontSize: 20,
}));

export default function BasicGrid() {
  const navigate = useNavigate();

  const navigateToNextPage = () => {
    navigate("/patient");
  };

  const { symptoms } = useContext(SymptomsContext);
  console.log(symptoms);

  // console.log(
  //   <ul style={{ padding: 10 }}>
  //     {symptoms.map((name, i) => {
  //       return (
  //         <li className="RecommendationsBody__listRow" key={i}>
  //           {name}
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );

  const { login } = useContext(LoginContext);

  const { patientData } = useContext(PatientDataContext);
  console.log(patientData);

  const { results } = useContext(DataContext);
  console.log(results);

  const { sadPerson } = useContext(SadPersonContext);
  console.log(sadPerson);

  let labels = [];
  let percentage = [];
  const comorbid = [];

  if (results.jsonData)
    for (const key in results.jsonData.Diagnosis) {
      labels.push(key);
      percentage.push(parseInt(results.jsonData.Diagnosis[key] * 100));

      if (parseInt(results.jsonData.Diagnosis[key] * 100) > 50) {
        comorbid.push(key);
        console.log(comorbid);
      }
    }

  var element = comorbid.join(" , ");
  console.log(element);

  const disorders = [
    "Depression",
    "Anxiety",
    "Schizophrenia",
    "SubstanceAbuse",
    "Bipolar",
    "Undetected",
  ];

  const index = percentage.indexOf(Math.max(...percentage));

  const Detected = disorders[index];
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
      return "PSYCHIATRIST";
    } else if (Detected == "Undetected") {
      return "No referral Option";
    } else {
      return "PSYCHIATRIST";
    }
  };
  console.log(referralOption);

  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"

  //symptoms where values are 1

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Medical Report</h1>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Item>
            <h2>Hospital Name:</h2>
            {login.user && login.user.hospitalName ? (
              login.user.hospitalName
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Doctor Name:</h2> Dr.{" "}
            {login.user && login.user.firstName ? (
              login.user.firstName
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Screening Date: </h2>
            {currentDate}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Patient ID: </h2>
            {patientData.Patient && patientData.Patient.PatientID ? (
              patientData.Patient.PatientID
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Patient Sex: </h2>
            {patientData.Patient && patientData.Patient.PatientSex ? (
              patientData.Patient.PatientSex
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            <h2>Patient Age: </h2>
            {patientData.Patient && patientData.Patient.PatientAge ? (
              patientData.Patient.PatientAge
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Disorders Detected: </h2>
            {element}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Diagnosis Results: </h2>
            <ol style={{ listStyle: "none" }}>
              <li>Depression: {percentage[0]}%</li>
              <li>Anxiety: {percentage[1]}%</li>
              <li>Schizophrenia: {percentage[2]}%</li>
              <li>Substance Abuse: {percentage[3]}%</li>
              <li>Bipolar: {percentage[4]}%</li>
              <li>Undetected: {percentage[5]}%</li>
            </ol>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Diagnostic Inference: </h2>
            Possible case of {element}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Symptoms: </h2>
            {}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>SadPersonsScale Score: </h2>
            {sadPerson.jsonData && sadPerson.jsonData.Score ? (
              sadPerson.jsonData.Score
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>SadPersonsScale Inference: </h2>{" "}
            {sadPerson.jsonData &&
            sadPerson.jsonData.Proposed_Clinical_Action ? (
              sadPerson.jsonData.Proposed_Clinical_Action
            ) : (
              <div>None</div>
            )}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Recommendations: </h2>
            {Detected ? (
              <ul style={{ padding: 10 }}>
                {rec[Detected].map((recomendation, i) => {
                  return (
                    <li className="RecommendationsBody__listRow" key={i}>
                      {recomendation}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>None</>
            )}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Referal Option: </h2>
            {referralOption()}
          </Item>
        </Grid>
      </Grid>
      <button
        type="submit"
        className="ReportsBody__submitButton"
        onClick={navigateToNextPage}
      >
        <p className="ReportsBody__submitText">Exit</p>
      </button>
    </Box>
  );
}
