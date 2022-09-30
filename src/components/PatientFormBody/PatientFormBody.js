import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientFormBody.css";
import MyInputField from "../Buttons/MyInputField";
import NextButton from "../Buttons/NextButton/NextButton";
import { LoginContext } from "../../context/LoginContext";
import { PatientDataContext } from "../../context/PatientDataContext";

export default function PatientFormBody() {
  const { login } = useContext(LoginContext);

  const { setPatientData } = useContext(PatientDataContext);

  const navigate = useNavigate();

  const [patientSex, setPatientSex] = useState("");

  const [addPatient, setAddPatient] = useState({
    firstname: "",
    lastname: "",
    email: "",
    sex: "",
    dob: "",
    contact: "",
    address: "",
  });

  const handleChange = (event) => {
    setAddPatient({
      ...addPatient,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // showLoader();

    const url =
      "https://eli46zfnxb.execute-api.us-east-1.amazonaws.com/prod/patient";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: login.user.doctorId,
          firstname: addPatient.firstname,
          lastname: addPatient.lastname,
          email: addPatient.email,
          sex: patientSex,
          dob: addPatient.dob,
          contact: addPatient.contact,
          address: addPatient.address,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // hideLoader();
        setPatientData(data);
        console.log(login.user.doctorId);
        navigate("/questionnaire");
        alert(data.message);
      } else {
        const data = await res.json();
        alert(data.message);
        // hideLoader();
      }
    } catch (err) {
      alert(err.message);
      // hideLoader();
    }
    // finally {
    //   setIsLoading((prevState) => !prevState);
    // }
  };

  return (
    <div className="PatientFormBody">
      <div className="PatientFormBody__formOutline">
        <p className="PatientFormBody__heading">Patient Data Form:</p>
        {MyInputField(
          "First Name",
          "text",
          "firstname",
          addPatient.firstname,
          handleChange
        )}
        {MyInputField(
          "Last Name",
          "text",
          "lastname",
          addPatient.lastname,
          handleChange
        )}
        {MyInputField(
          "Email",
          "email",
          "email",
          addPatient.email,
          handleChange
        )}
        {MyInputField(
          "Date of Birth",
          "date",
          "dob",
          addPatient.dob,
          handleChange
        )}
        {MyInputField(
          "Address",
          "address",
          "address",
          addPatient.address,
          handleChange
        )}
        {MyInputField(
          "Phone number",
          "tel",
          "contact",
          addPatient.contact,
          handleChange
        )}
        <label>
          Sex
          <select
            className="PatientFormBody__selectField"
            name="sex"
            onChange={(e) => {
              const sexChosen = e.target.value;
              setPatientSex(sexChosen);
            }}
          >
            <option value=""></option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>
        <div className="PatientFormBody__spaceBetween"></div>
        {/* {MySelectField("Sex", "Male", "Female")} */}
        {NextButton("Next", "submit", handleSubmit)}
      </div>
    </div>
  );
}
