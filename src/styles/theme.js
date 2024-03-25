import { createTheme } from "@mui/material"
import {
  BACKGROUND_LIGHT,
  CONTRAST_DARK,
  ERROR,
  GREEN_LIGHT,
  GREEN_REGULAR,
  GREEN_TEXT,
} from "./constants"

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: GREEN_LIGHT,
    },
    success: {
      main: GREEN_REGULAR,
    },
    error: {
      main: ERROR,
    },
    text: {
      main: GREEN_TEXT,
    },
  },
  typography: {
    h2: {
      margin: "10px 0 20px 0",
      textAlign: "center",
      fontWeight: 700,
      fontSize: 24,
      color: GREEN_TEXT,
    },
  },
  breakpoints: {
    values: {
      mobile: 576,
      tablet: 768,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_LIGHT,
          border: "2px solid",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: GREEN_REGULAR,
            color: BACKGROUND_LIGHT,
            border: `2px solid ${GREEN_TEXT}`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          margin: "5px 0 10px 0",
          "& .MuiInputBase-input": {
            color: CONTRAST_DARK,
          },
          "& .MuiSvgIcon-root": {
            color: GREEN_LIGHT,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          margin: "10px 0",
          backgroundColor: BACKGROUND_LIGHT,
          border: `1px solid ${GREEN_LIGHT}`,
        },
      },
    },
  },
})

export default theme
