"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { SxProps } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { SyntheticEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "700px",
  bgcolor: "primary.main",
  p: 4,
};

const AuthModal: React.FC = () => {
  const [value, setValue] = useState("1");
  const [isLogged, setIsLogged] = useState(true);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const token = Cookies.get("artx-token");
    if (!token) setIsLogged(false);
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={!isLogged}
      onClose={() => {}}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={!isLogged}>
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                centered
              >
                <Tab
                  label="Login"
                  value="1"
                  sx={{ width: "50%", color: "secondary.main" }}
                />
                <Tab
                  label="Register"
                  value="2"
                  sx={{ width: "50%", color: "secondary.main" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <LoginForm setIsLogged={setIsLogged} />
            </TabPanel>
            <TabPanel value="2">
              <RegisterForm setIsLogged={setIsLogged} />
            </TabPanel>
          </TabContext>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
