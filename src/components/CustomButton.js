import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ buttonText, buttonColor, onClickHandler }) => {
  return (
    <Button
      variant="contained"
      style={{ background: buttonColor }}
      onClick={onClickHandler}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
