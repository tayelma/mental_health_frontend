// import React from "react";
// import "./LoginPage.css";
import CustomTextField from "../../components/CustomTextField";
// import CustomizedButtons from "../../components/CustomButton";
import { Card, CardContent, Grid } from "@mui/material";
import logo from "./../../images/mental-health-pic.png";

import * as React from "react";
import Stack from "@mui/material/Stack";
import CustomButton from "../../components/CustomButton";

export default function () {
  const signupHandler = async () => {
    const url =
      "http://localhost:80/registration_api/api/student_info/sign_up.php";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "form.email.value",
        password: "form.password.value",
      }),
    });

    if (res.ok) {
      alert("is okay");
      const jsonData = await res.json();
      console.log(jsonData);
    } else {
      alert("not okay");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} className="grid--center">
        <img src={logo} alt="logo image" />
      </Grid>
      <Grid item xs={12} md={6} className="grid--center">
        <Card
          variant="outline"
          sx={{
            width: "60%",
            borderRadius: "10px",
            border: "1px solid grey",
            backgroundColor: "#F4F3F3",
          }}
        >
          <h1
            style={{ textAlign: "center" }}
            color="text.secondary"
            gutterBottom
          >
            Register
          </h1>
          <CardContent sx={{ textAlign: "center" }}>
            <CustomTextField
              label="First Name"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Last Name"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Gender"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Hospital Name"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Hospital Location"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Hospital category"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Email Address"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Password"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
            <CustomTextField
              label="Re-enter Password"
              defaultValue=""
              id="reddit-input"
              variant="filled"
              style={{ marginTop: 11, color: "red" }}
            />
          </CardContent>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "#00C2CB",
              padding: "10px",
            }}
          >
            <CustomButton
              onClickHandler={signupHandler}
              buttonText={"Register"}
              buttonColor={"#35C0ED"}
            />
            <CustomButton
              onClickHandler={signupHandler}
              buttonText={"Login"}
              buttonColor={"#35C0ED"}
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
