import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import store from "./store"
import theme from "./styles/theme"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
