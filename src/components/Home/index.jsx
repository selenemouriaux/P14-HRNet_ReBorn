import HomeIcon from "@mui/icons-material/Home"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { Box, Button, Stack, Typography } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import styles from "./styles"

const Home = () => {
  const location = useLocation()
  return (
    <>
      <Stack sx={styles}>
        <Box className="nav-box">
          {location.pathname.includes("/employee-add") ? (
            <NavLink to="/employee-list">
              <Button color="success" variant="outlined" endIcon={<HomeIcon />}>
                View Employees
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/employee-add">
              <Button
                color="success"
                variant="outlined"
                endIcon={<PersonAddAlt1Icon />}
              >
                Create Employee
              </Button>
            </NavLink>
          )}
        </Box>
        <NavLink to="/">
          <Stack className="centered-layout">
            <img src="wealth_health.png" />
            <Typography>HRnet</Typography>
          </Stack>
        </NavLink>
      </Stack>
      <Outlet />
    </>
  )
}

export default Home
