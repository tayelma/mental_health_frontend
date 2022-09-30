import React from "react";
import "./MySelectField.css";

function MySelectField(label, option1, option2) {
  return (
    <div>
      <label for="gender">{label}:</label>
      <select className="MySelectField" id="gender" name="gender">
        <option value={option1}>{option1}</option>
        <option value={option2}>{option2}</option>
      </select>
    </div>
  );
}

export default MySelectField;
