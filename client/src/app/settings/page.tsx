"use client";

import Box from "@mui/material/Box";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  Stack,
  SxProps,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import UserService from "@/services/userService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { DarkModeSharp, WbSunnySharp } from "@mui/icons-material";

const settingBoxStyle: SxProps = {
  bgcolor: "info.main",
  width: "100%",
  p: 4,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "primary.main",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function SettingsPage() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const navigate = useRouter();
  const handleDelete = () => {
    UserService.remove({
      then: (_) => {
        Cookies.remove("artx-token");
        navigate.push("/");
        location.reload();
      },
      error: (err) => console.error(err),
    });
  };
  const handleTheme = () => {
    const theme = localStorage.getItem("artx-theme");
    if (!theme) {
      localStorage.setItem("artx-theme", "light");
      setCurrentTheme("light");
    } else {
      if (theme === "light") {
        localStorage.setItem("artx-theme", "dark");
        setCurrentTheme("dark");
      } else {
        localStorage.setItem("artx-theme", "light");
        setCurrentTheme("light");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Typography color="primary" fontSize={30} fontWeight={300} mt={2}>
        {"> Settings"}
      </Typography>
      <Stack mt={3} spacing={1.5}>
        <Box sx={settingBoxStyle}>
          <Typography color="primary" fontSize={20} fontWeight={300}>
            Theme
          </Typography>
          <IconButton color="primary" onClick={handleTheme}>
            {currentTheme === "light" ? <WbSunnySharp /> : <DarkModeSharp />}
          </IconButton>
        </Box>
        <Box sx={settingBoxStyle}>
          <Typography color="primary" fontSize={20} fontWeight={300}>
            Delete your account definitely
          </Typography>
          <Button variant="outlined" onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
        </Box>
      </Stack>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={deleteModal}>
          <Box sx={style}>
            <Typography fontSize={25} color="secondary">
              Are you sure you want to delete this account ?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              onClick={handleDelete}
              fullWidth
            >
              <Typography color="primary">
                I confirm, delete this account
              </Typography>
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
