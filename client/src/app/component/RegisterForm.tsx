"use client";

import Typography from "@mui/material/Typography";
import { Button, Stack, SxProps, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import Cookies from "js-cookie";
import AuthService from "@/services/authService";

const textfieldStyle: SxProps = {
  input: { color: "secondary.main" },
  label: { color: "secondary.main" },
};

type RegisterFormProps = {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ setIsLogged }) => {
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event: any, key: string) => {
    setForm({ ...form, [key]: event.target.value });
  };
  const handleSignUp = () => {
    const { confirmPassword, ...rest } = form;

    if (form.password === form.confirmPassword) {
      setPwdNotMatch(false);
      AuthService.register({
        body: rest,
        then: (res: any) => {
          Cookies.set("artx-token", res.data.token, { expires: 7 });
          setIsLogged(true);
          location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      setPwdNotMatch(true);
    }
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
        Sign up with Google
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
        type="text"
        label="Username"
        variant="standard"
        color="secondary"
        sx={textfieldStyle}
        onChange={(event) => handleChange(event, "username")}
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
        error={pwdNotMatch}
      />
      <TextField
        type="password"
        label="Confirm password"
        variant="standard"
        color="secondary"
        sx={textfieldStyle}
        onChange={(event) => handleChange(event, "confirmPassword")}
        fullWidth
        error={pwdNotMatch}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSignUp}
        sx={{ marginTop: "50px !important" }}
        fullWidth
      >
        <Typography color="primary">Sign up</Typography>
      </Button>
    </Stack>
  );
};

export default RegisterForm;
