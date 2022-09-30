import React from "react";
import "./MyInputField.css";

function MyInputField(label, typeValue, id, value, change) {
  return (
    <label>
      {label}
      <input
        className="MyInputField__inputField"
        type={typeValue}
        required
        id={id}
        value={value}
        onChange={change}
      />
    </label>
  );
}

export default MyInputField;
