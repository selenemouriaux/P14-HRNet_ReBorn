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
import { useDispatch } from "react-redux"
import { departments, states } from "../../assets/lists.json"
import { addEmployee } from "../../employeesSlice"

import styles from "./styles"

const CreateEmployee = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newUser = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      startDate: formData.get("startDate"),
      department: formData.get("department"),
      dateOfBirth: formData.get("dateOfBirth"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
    }
    dispatch(addEmployee(newUser))
    event.target.reset()
  }
  return (
    <Stack sx={styles}>
      <Typography variant="h2">Create Employee</Typography>
      <Box className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            className="expansible50"
            required
            name="firstName"
            label="First Name"
          />
          <TextField
            className="expansible50"
            required
            name="lastName"
            label="Last Name"
          />
          <Box className="datePickerBox">
            <InputLabel className="form-label collapsible30">
              Date of Birth :
            </InputLabel>
            <DatePicker
              className="collapsible70"
              name="dateOfBirth"
              defaultValue={new Date()}
            />
          </Box>
          <Box component="fieldset" className="subCategoryFields">
            <legend>
              <Typography className="form-label">Address</Typography>
            </legend>
            <TextField required name="street" label="Street" />
            <TextField required name="city" label="City" />
            <Autocomplete
              options={states}
              disablePortal
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} name="state" label="State" required />
              )}
            />
            <TextField type="number" required name="zipCode" label="Zip Code" />
          </Box>
          <Box className="datePickerBox">
            <InputLabel className="form-label collapsible30">
              Start Date :
            </InputLabel>
            <DatePicker
              className="collapsible70"
              name="startDate"
              defaultValue={new Date()}
            />
          </Box>
          <Autocomplete
            options={departments}
            disablePortal
            renderInput={(params) => (
              <TextField
                {...params}
                name="department"
                label="Department"
                required
              />
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Box>
    </Stack>
  )
}

export default CreateEmployee
