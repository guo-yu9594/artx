"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Stack, SxProps, TextField } from "@mui/material";
import Cookies from "js-cookie";
import AuthService from "@/services/authService";

const textfieldStyle: SxProps = {
  input: { color: "secondary.main" },
  label: { color: "secondary.main" },
};

type LoginFormProps = {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

const LoginForm: React.FC<LoginFormProps> = ({ setIsLogged }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: any, key: string) => {
    setForm({ ...form, [key]: event.target.value });
  };
  const handleLogIn = () => {
    AuthService.login({
      body: form,
      then: (res: any) => {
        Cookies.set("artx-token", res.data.token, { expires: 7 });
        setIsLogged(true);
        location.reload();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  };
  const handleGoogle = () => {
    AuthService.googleUrl({
      then: (res) => open(res.data.authorizeUrl, "_self"),
      error: (err) => console.error(err),
    });
  };

  return (
    <Stack direction="column" spacing={4} alignItems="center">
      <Button
        variant="outlined"
        color="secondary"
        sx={{ py: 1.5 }}
        onClick={handleGoogle}
        fullWidth
      >
        <img
          src="https://ragsdalemartin.com/wp-content/uploads/2020/07/white-google-logo.png"
          style={{ height: "22px", objectFit: "cover", marginRight: "20px" }}
        ></img>
        Log in with Google
      </Button>
      <Typography color="secondary">Or</Typography>
      <TextField
        type="email"
        label="Email"
        variant="standard"
        color="secondary"
        sx={textfieldStyle}
        onChange={(event) => handleChange(event, "email")}
        fullWidth
      />
      <TextField
        type="password"
        label="Password"
        variant="standard"
        color="secondary"
        sx={textfieldStyle}
        onChange={(event) => handleChange(event, "password")}
        fullWidth
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogIn}
        sx={{ marginTop: "50px !important" }}
        fullWidth
      >
        <Typography color="primary">Log in</Typography>
      </Button>
    </Stack>
  );
};

export default LoginForm;
