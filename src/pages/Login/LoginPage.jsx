// import React from "react";
import "./LoginPage.css";
import CustomTextField from "../../components/CustomTextField";
import { Card, CardContent, Grid } from "@mui/material";
import logo from "./../../images/mental-health-pic.png";

import * as React from "react";
import Stack from "@mui/material/Stack";

import Link from "@mui/material/Link";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";

export default function () {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = async () => {
    const url =
      "http://localhost:80/registration_api/api/student_info/login.php";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
            Login
          </h1>
          <CardContent sx={{ textAlign: "center" }}>
            <CustomTextField
              label="Staff ID"
              value={email}
              onChange={handleChange}
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
          </CardContent>
          <div style={{ textAlign: "center" }}>
            <Link href="#" underline="none">
              {"Forgot password?"}
            </Link>
          </div>

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
              onClickHandler={loginHandler}
              buttonText={"Login"}
              buttonColor={"#35C0ED"}
            />
            <CustomButton buttonText={"Register"} buttonColor={"#35C0ED"} />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
