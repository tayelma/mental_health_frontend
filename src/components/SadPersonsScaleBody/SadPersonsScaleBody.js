import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SadPersonContext } from "../../context/SadPersonContext";
import "./SadPersonsScaleBody.css";
import { SadPersonsScaleQuestionbank } from "./SadPersonsScaleQuestions";
import ReactPaginate from "react-paginate";

function SadPersonsScaleBody() {
  const [answers, setAnswers] = useState({});

  const [selectedAnswers, setSelectedAnswers] = useState([]); // yes - 1, no - 0

  const { setSadPersonValue } = useContext(SadPersonContext);

  const makeAnswer = (key, value) => {
    const newData = {};
    newData[`${key}`] = parseInt(value);
    setAnswers((prevAnswer) => {
      return { ...prevAnswer, ...newData };
    });
  };

  const handleChange = (name, value) => {
    setSelectedAnswers((prevValue) => [
      { name: name, value: value },
      ...prevValue,
    ]);
    console.log({ name, value });
    const _value = selectedAnswers.find(({ name }) => name === name);
    makeAnswer(name, value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // showLoader();
    // console.log(answers);

    const url =
      "https://eli46zfnxb.execute-api.us-east-1.amazonaws.com/prod/sadperson";

    const _response = {};
    // const [questions, setQuestions] = useState("");

    const allResponses = questions.map(({ feature, symptom, question }) => {
      const answer =
        selectedAnswers.find(({ name }) => name === symptom)?.value || "0";
      return {
        feature,
        symptom,
        question,
        answer: Number(answer),
      };
    });

    for (const item of allResponses) {
      _response[item.symptom] = item.answer;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ..._response }),
    }).catch((err) => {
      alert(err.message);
      // hideLoader();
      return null;
    });

    console.log(_response);

    if (res && res.ok) {
      console.log("inside results");
      const jsonData = await res.json();
      await setSadPersonValue(() => ({ ...{}, ...{ jsonData } }));
      console.log(jsonData);
      // hideLoader();
      navigate("/reports");
    }
  };

  useEffect(() => {
    SadPersonsScaleQuestionbank.map((sadperson) => {
      makeAnswer(sadperson.symptom, sadperson.answer);
    });
  }, []);

  const [questions, setQuestions] = useState(
    SadPersonsScaleQuestionbank.slice(0, 10)
  );
  const [pageNumber, setpageNumber] = useState(0);

  const usersPerPage = 11;

  const pagesVisited = pageNumber * usersPerPage;

  const displayQuestions = questions
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((sadperson, i) => {
      const value = selectedAnswers.find(
        ({ name }) => name === sadperson.symptom
      );

      return (
        <div className="SadPersonsScaleBody__outline" key={i}>
          <div className="SadPersonsScaleBody__outlineInner">
            <div className="SadPersonsScaleBody__disorder">
              {sadperson.feature}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="SadPersonsScaleBody__answersContainer"
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: "solid",
                    borderWidth: 1,
                    // background: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 6,
                  }}
                  // onClick={handleChange}
                  onClick={(e) => handleChange(sadperson.symptom, "1")}
                >
                  {value?.value === "1" && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        background: "black",
                      }}
                    />
                  )}
                </div>
                {/* <span className="SadPersonsScaleBody__checkmark"></span> */}
                yes
              </div>

              <div
                className="SadPersonsScaleBody__space"
                style={{ width: "5rem" }}
              ></div>

              <div
                className="SadPersonsScaleBody__container"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <input
                  name={sadperson.symptom}
                  type="radio"
                  value={value?.value || 0}
                  onChange={handleChange}
                /> */}
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: "solid",
                    borderWidth: 1,
                    // background: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 6,
                    marginLeft: 8,
                  }}
                  onClick={(e) => handleChange(sadperson.symptom, "0")}
                >
                  {value?.value === "0" && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        background: "black",
                      }}
                    />
                  )}
                </div>
                {/* <span className="SadPersonsScaleBody__checkmark"></span> */}
                no
              </div>
            </div>
          </div>
          <div className="SadPersonsScaleBody__question">
            {sadperson.question}
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(questions.length / usersPerPage);

  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  return (
    <div className="SadPersonsScaleBody">
      <p className="SadPersonsScaleBody__heading">SAD PERSONS SCALE: </p>
      {displayQuestions}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      {pageNumber == 0 && (
        <div className="SadPersonsScaleBody__positionButton">
          <button
            type="submit"
            className="SadPersonsScaleBody__submitButton"
            onClick={handleSubmit}
          >
            <p className="SadPersonsScaleBody__submitText">Submit</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default SadPersonsScaleBody;
