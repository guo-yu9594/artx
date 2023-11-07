import { BioRhyme } from "next/font/google";
import { PaletteOptions, createTheme } from "@mui/material/styles";

const bioRhyme = BioRhyme({
  weight: ["200", "300", "400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const getPalette = (mode: string): PaletteOptions => {
  return mode === "light"
    ? {
        background: { default: "#ebf7ee" },
        primary: { main: "#121412" },
        secondary: { main: "#ebf7ee" },
        info: { main: "#d3f5dc" },
      }
    : {
        background: { default: "#141124" },
        primary: { main: "#e61515" },
        secondary: { main: "#141124" },
        info: { main: "#19162e" },
      };
};

const theme = createTheme({
  palette: getPalette("light"),
  typography: {
    fontFamily: bioRhyme.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
