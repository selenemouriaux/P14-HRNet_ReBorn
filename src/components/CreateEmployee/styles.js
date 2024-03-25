import { GREEN_DARK, GREEN_LIGHT } from "../../styles/constants"

const styles = (theme) => ({
  display: "grid",
  ".form-container": {
    maxWidth: 576,
    justifySelf: "center",
  },
  ".form-label": {
    fontWeight: 700,
  },
  ".datePickerBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 3,
  },
  ".subCategoryFields": {
    marginBottom: 3,
    color: GREEN_DARK,
    border: `1px solid ${GREEN_LIGHT}`,
    borderRadius: "5px",
  },
  ".expansible50": {
    [theme.breakpoints.down("mobile")]: {
      width: "100%",
    },
    [theme.breakpoints.up("mobile")]: {
      width: "50%",
    },
  },
  ".expansible60": {
    [theme.breakpoints.down("mobile")]: {
      width: "100%",
    },
    [theme.breakpoints.up("mobile")]: {
      width: "60%",
    },
  },
  ".collapsible70": {
    [theme.breakpoints.down("mobile")]: {
      width: "50%",
    },
    [theme.breakpoints.up("mobile")]: {
      width: "70%",
    },
  },
  ".collapsible30": {
    [theme.breakpoints.down("mobile")]: {
      width: "50%",
    },
    [theme.breakpoints.up("mobile")]: {
      width: "30%",
    },
  },
})
export default styles
