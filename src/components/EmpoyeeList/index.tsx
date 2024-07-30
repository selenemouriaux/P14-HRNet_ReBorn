import { Stack, Typography } from "@mui/material"
// import Table from "@mui/material/Table"
// import TableBody from "@mui/material/TableBody"
// import TableCell from "@mui/material/TableCell"
// import TableContainer from "@mui/material/TableContainer"
// import TableHead from "@mui/material/TableHead"
// import TableRow from "@mui/material/TableRow"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import SivTable from "../CustomTableComponent"
import styles from "./styles"
import { RootState } from "../../store"

const EmployeesList = () => {
  const employeesList = useSelector((state: RootState) => state.employeesList)

  const location = useLocation()
  const { state } = location
  // console.log("remaining space = ", window.innerHeight - 320 - state.height)
  return (
    <>
      <Stack sx={styles}>
        <Typography variant="h2">Current Employees</Typography>
        <SivTable
          height={`${window.innerHeight - 320 - state?.height}px`}
          data={employeesList}
          columns={[
            { title: "First Name", name: "firstName", width: "120px" },
            {
              title: "Last Name",
              name: "lastName",
              width: "150px",
              isReference: true,
            },
            {
              title: "Start Date",
              name: "startDate",
              collapse: true,
              disappearanceOrder: 1,
            },
            { title: "Department", name: "department" },
            {
              title: "Date of Birth",
              name: "dateOfBirth",
              collapse: true,
              disappearanceOrder: 3,
              // disableSorting: true,
            },
            {
              title: "Street",
              name: "street",
              collapse: true,
              disappearanceOrder: 2,
              width: "250px",
            },
            {
              title: "City",
              name: "city",
              collapse: true,
              disappearanceOrder: 4,
            },
            {
              title: "State",
              name: "state",
              collapse: true,
              disappearanceOrder: 6,
            },
            {
              title: "Zip Code",
              name: "zipCode",
              collapse: true,
              disappearanceOrder: 5,
            },
          ]}
          // nbItemsPerPage={15}
          // noSearchBar
          // title="TITRE !"
        />
        <br />
      </Stack>
    </>
  )
}

export default EmployeesList
