import "@mui/system"

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true
    tablet: true
  }
}
