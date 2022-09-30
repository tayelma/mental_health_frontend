import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { NewQuestionBank } from "./QuestionBank";
import { RevisedQuestions } from "./NewQuestions";
import "./QuestionsBody2.css";
import { DataContext } from "../../context/DataContext";
import useFullPageLoader from "./useFullPageLoader";
import Reactpaginate from "react-paginate";
import { SymptomsContext } from "../../context/SymptomsContext";

function QuestionsBody() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [selectedAnswers, setSelectedAnswers] = useState([]); // yes - 1, no - 0

  const { results, setResults } = useContext(DataContext);

  const { setSymptoms } = useContext(SymptomsContext);

  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  const makeAnswer = (key, value) => {
    const newData = {};
    newData[`${key}`] = parseInt(value);
    setAnswers((prevAnswer) => {
      // console.log(newData);
      // console.log(prevAnswer);
      return { ...prevAnswer, ...newData };
    });
  };

  const handleChange = (name, value) => {
    // console.log(e.target.value, e.target.name);
    setSelectedAnswers((prevValue) => [
      { name: name, value: value },
      ...prevValue,
    ]);
    console.log({ name, value });
    const _value = selectedAnswers.find(({ name }) => name === name);
    // console.log({
    //   name,
    //   value,
    //   selectedAnswers,
    //   value,
    // });
    // console.log({ selectedAnswers });
    makeAnswer(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    // console.log(answers);

    const url = "https://mental-health-new.herokuapp.com/predict";

    const _response = {};

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
    console.log("answershere");
    setSymptoms(selectedAnswers);

    // allResponses.forEach(({ name, value }) => {
    //   _response[name] = value;
    // });

    for (const item of allResponses) {
      _response[item.symptom] = item.answer;
    }

    const fast = {
      history: 0,
      more_than_one_month: 0,
      not_explained_by_other_MHD: 0,
      not_attitributed_to_other_condition: 0,
      significant_impairment: 0,
      sad_mood: 0,
      interest_in_activities: 0,
      energy_level: 0,
      change_in_sleep_pattern: 0,
      more_sleep: 0,
      change_in_eating_pattern: 0,
      more_eating: 0,
      feeling_worthless: 0,
      no_hope_in_life: 0,
      reduced_libido: 0,
      self_harm: 0,
      excessive_worry: 0,
      controlling_worry: 0,
      restlessness: 0,
      easliy_fatigued: 0,
      difficulty_concentrating: 0,
      irritability: 0,
      muscle_tension: 0,
      delusions: 0,
      hallucinations: 0,
      disorganised_speech: 0,
      disorganised_behaviour: 0,
      catatonic_behaviour: 0,
      flat_affect: 0,
      alogia: 0,
      avolition: 0,
      use_illicit_drugs: 0,
      use_unprescribed_medications: 0,
      increase_in_dosage: 0,
      increase_in_cost_of_use: 0,
      strong_urge_to_use: 0,
      neglect_other_activity: 0,
      use_despite_knowledge_of_harm: 0,
      withdrawal_symptoms: 0,
      elevated_mood: 0,
      grandiosity: 0,
      not_needing_sleep: 0,
      talkative: 0,
      flying_thoughts: 0,
      easily_distracted: 0,
      recklessness: 0,
      increase_goal_oriented: 0,
      hospitalization: 0,
      depressed_mood: 0,
    };

    // console.log({ _response, fast });
    console.log({ yourData: RevisedQuestions.length });
    let len = 0;
    for (const u of Object.keys(fast)) {
      len++;
    }

    console.log({ fast: len });

    // for (const i of Object.keys(_response)) {
    //   if (fast[i] === _response[i]) {
    //     console.log("yh");
    //   } else {
    //     console.log("nope");
    //   }
    // }

    // return;
    // try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ..._response }),
    }).catch((err) => {
      alert(err.message);
      hideLoader();
      return null;
    });

    //try and save the symptoms into a context to access in the results page
    console.log(_response);
    if (res && res.ok) {
      console.log("inside results");
      const jsonData = await res.json();
      await setResults(() => ({ ...{}, ...{ jsonData } }));
      // console.log(results);
      // console.log(jsonData);
      hideLoader();
      navigate("/Results");
    } else {
      alert("could not process request");
      hideLoader();
    }
  };

  useEffect(() => {
    RevisedQuestions.map((questionnaire) => {
      makeAnswer(questionnaire.symptom, questionnaire.answer);
    });
    // console.log(answers);
  }, []);

  const [questions, setQuestions] = useState(RevisedQuestions.slice(0, 55));
  const [pageNumber, setpageNumber] = useState(0);

  const usersPerPage = 11;

  const pagesVisited = pageNumber * usersPerPage;

  const displayQuestions = questions
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((questionnaire, i) => {
      // {
      // NewQuestionBank.map((questionnaire, i) => {
      const value = selectedAnswers.find(
        ({ name }) => name === questionnaire.symptom
      );

      return (
        <div className="QuestionsBody__outline" key={i}>
          <div className="QuestionsBody__outlineInner">
            <div className="QuestionsBody__disorder">
              {questionnaire.feature}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="QuestionsBody__answersContainer"
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
                  onClick={(e) => handleChange(questionnaire.symptom, "1")}
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
                {/* <span className="QuestionsBody__checkmark"></span> */}
                yes
              </div>

              <div
                className="QuestionsBody__space"
                style={{ width: "5rem" }}
              ></div>

              <div
                className="QuestionsBody__container"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <input
                  name={questionnaire.symptom}
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
                  onClick={(e) => handleChange(questionnaire.symptom, "0")}
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
                {/* <span className="QuestionsBody__checkmark"></span> */}
                no
              </div>
            </div>
          </div>
          <div className="QuestionsBody__question">
            {questionnaire.question}
          </div>
          {/* <div className="QuestionsBody__positionButton">
            <button
              type="submit"
              className="QuestionsBody__submitButton"
              onClick={handleSubmit}
            >
              <p className="QuestionsBody__submitText">Submit</p>
            </button>
          </div> */}
        </div>
      );
      // }
      // );
      // }
    });

  const pageCount = Math.ceil(questions.length / usersPerPage);

  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  return (
    <div className="QuestionsBody">
      <p className="QuestionsBody__heading">Patient Examination: </p>
      {displayQuestions}
      <Reactpaginate
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
      {pageNumber == 4 && (
        <div className="QuestionsBody__positionButton">
          <button
            type="submit"
            className="QuestionsBody__submitButton"
            onClick={handleSubmit}
          >
            <p className="QuestionsBody__submitText">Submit</p>
          </button>
        </div>
      )}

      {loader}
    </div>
  );
}

export default QuestionsBody;
