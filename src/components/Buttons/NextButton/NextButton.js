import React from "react";
import "./NextButton.css";

function NextButton(ButtonContent, typeValue, handlebutton) {
  return (
    <div className="NextButton">
      <button
        className="NextButton__button"
        type={typeValue}
        onClick={handlebutton}
      >
        {ButtonContent}
      </button>
    </div>
  );
}

export default NextButton;
