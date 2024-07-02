import HomeIcon from "@mui/icons-material/Home"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { Box, Button, Stack, Typography } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import styles from "./styles"
import { useEffect, useRef, useState } from "react"

const Home = () => {
  const location = useLocation()
  const [elementHeight, setElementHeight] = useState(0)
  const headerRef = useRef(null)

  useEffect(() => {
    if (headerRef.current) setElementHeight(headerRef.current.offsetHeight)
  })

  return (
    <>
      <Stack sx={styles}>
        <Stack ref={headerRef}>
          <Box className="nav-box">
            {location.pathname.includes("/employee-add") ? (
              <NavLink to="/employee-list" state={{ height: elementHeight }}>
                <Button
                  color="success"
                  variant="outlined"
                  endIcon={<HomeIcon />}
                >
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
      </Stack>
    </>
  )
}

export default Home
