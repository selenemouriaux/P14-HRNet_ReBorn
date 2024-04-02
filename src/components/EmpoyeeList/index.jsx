import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import styles from "./styles"

const EmployeesList = () => {
  const employeesList = useSelector((state) => state.employeesList)
  console.log(employeesList)
  return (
    <Stack sx={styles}>
      <Typography variant="h2">Current Employees</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Start date</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Street</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Zip Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.dateOfBirth}</TableCell>
                <TableCell align="right">{row.street}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">{row.zipCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default EmployeesList
