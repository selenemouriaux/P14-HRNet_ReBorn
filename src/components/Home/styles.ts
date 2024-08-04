import { Theme } from "@mui/material/styles"

const styles = (theme: Theme) => ({
  alignItems: "center",
  ".nav-box": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("mobile")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("mobile")]: {
      justifyContent: "flex-end",
    },
  },
  ".centered-layout": {
    alignItems: "center",
  },
})

export default styles
