"use client";

import UserService from "@/services/userService";
import { Stack, SxProps, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type User = {
  email: string;
  name: string;
};

const profileStackStyle: SxProps = {
  width: "100%",
  height: "15%",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "primary.main",
};

const UserProfile = () => {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
  });
  useEffect(() => {
    const token = Cookies.get("artx-token");

    if (token) {
      UserService.getUserData({
        then: ({ data }) => {
          setUser({ email: data.email, name: data.name });
          localStorage.setItem("artx-user", JSON.stringify(data));
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }, []);

  return (
    <Stack sx={profileStackStyle}>
      <Typography fontWeight={400} fontSize={35} color="secondary">
        Welcome {user.name} !
      </Typography>
    </Stack>
  );
};

export default UserProfile;
