"use client";

import { Box, Button, Link, Stack } from "@mui/material";
import Cookies from "js-cookie";

const SideActionButtons: React.FC = () => {
  const handleLogOut = () => {
    Cookies.remove("artx-token");
  };

  return (
    <Stack direction="row" sx={{ mt: "auto", width: "100%" }} spacing={1}>
      <Link href="/" sx={{ width: "50%" }}>
        <Button
          sx={{ border: 1, py: 1, borderRadius: 0 }}
          variant="outlined"
          onClick={handleLogOut}
          fullWidth
        >
          Log out
        </Button>
      </Link>
      <Link href="/settings" sx={{ width: "50%" }}>
        <Button
          sx={{ border: 1, py: 1, borderRadius: 0 }}
          variant="outlined"
          fullWidth
        >
          Settings
        </Button>
      </Link>
    </Stack>
  );
};

export default SideActionButtons;
