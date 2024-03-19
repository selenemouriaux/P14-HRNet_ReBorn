import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import { departments, states } from "../assets/dropDownLists.json"
import { GREEN_DARK, GREEN_LIGHT } from "../styles/constants"

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({})
  const handleSubmit = (event) => {
    event.preventDefault()
    setEmployee(null)
  }
  console.log(typeof states)
  return (
    <Stack sx={{ display: "grid" }}>
      <Typography variant="h2">Create Employee</Typography>
      <Box sx={{ maxWidth: 500, justifySelf: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ width: "50%" }}
            required
            id="firstName"
            label="First Name"
            value={employee.firstName}
          />
          <TextField
            sx={{ width: "50%" }}
            required
            id="lastName"
            label="Last Name"
            value={employee.lastName}
          />
          <Box sx={{ display: "flex", alignItems: "center", paddingLeft: 3 }}>
            <InputLabel sx={{ fontWeight: 700, width: "30%" }}>
              Date of Birth :
            </InputLabel>
            <DatePicker
              sx={{ justifySelf: "flex-end", width: "70%" }}
              defaultValue={new Date()}
            />
          </Box>
          <Box
            component="fieldset"
            sx={{
              marginBottom: 3,
              color: GREEN_DARK,
              border: `1px solid ${GREEN_LIGHT}`,
              borderRadius: "5px",
            }}
          >
            <legend>
              <Typography fontWeight={700}>Address</Typography>
            </legend>
            <TextField
              required
              id="street"
              label="Street"
              // value={employee.address.street}
            />
            <TextField
              required
              id="city"
              label="City"
              // value={employee.address.city}
            />
            <Autocomplete
              options={states}
              disablePortal
              getOptionLabel={(option) => option.name}
              id="state"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  required
                  // value={employee.address.state}
                />
              )}
            />
            <TextField
              type="number"
              required
              id="zipCode"
              label="Zip Code"
              // value={employee.address.zipcode}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputLabel sx={{ width: "30%", fontWeight: 700 }}>
              Start Date :
            </InputLabel>
            <DatePicker sx={{ width: "40%" }} defaultValue={new Date()} />
            <Autocomplete
              sx={{ width: "60%" }}
              options={departments}
              disablePortal
              id="department"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  required
                  value={employee.department}
                />
              )}
            />
          </Box>
        </form>
      </Box>
      <Button>Save</Button>
    </Stack>
  )
}

export default CreateEmployee
