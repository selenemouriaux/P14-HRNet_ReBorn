import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useDispatch } from "react-redux"
import { departments, states } from "../../assets/lists.json"
import { addEmployee } from "../../employeesSlice"

import { useState } from "react"
import { SivTabledataSchema } from "../../validationSchema"
import { SivTableData } from "../CustomTableComponent/types"
import styles from "./styles"

const CreateEmployee = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const rawFormData = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      dateOfBirth: formData.get("dateOfBirth")?.toString() || "",
      street: formData.get("street")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      state: formData.get("state")?.toString() || "",
      zipCode: Number(formData.get("zipCode")) ?? null,
      startDate: formData.get("startDate")?.toString() || "",
      department: formData.get("department")?.toString() || "",
    }

    const parsedResult = SivTabledataSchema.safeParse(rawFormData)

    if (parsedResult.success) {
      const newUser: SivTableData = parsedResult.data
      dispatch(addEmployee(newUser))
      setOpen(true)
      event.currentTarget.reset()
    } else {
      const errorObject: Record<string, string> = {}
      parsedResult.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errorObject[err.path[0]] = err.message
        }
      })
      setErrors(errorObject)
    }
  }
  return (
    <Stack sx={styles}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        Employee Created !
      </Dialog>
      <Typography variant="h2">Create Employee</Typography>
      <Box className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            className="expansible50"
            name="firstName"
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            className="expansible50"
            name="lastName"
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            <TextField
              name="street"
              label="Street"
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              name="city"
              label="City"
              error={!!errors.city}
              helperText={errors.city}
            />
            <Autocomplete
              options={states}
              disablePortal
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="state"
                  label="State"
                  error={!!errors.state}
                  helperText={errors.state}
                />
              )}
            />
            <TextField
              type="number"
              name="zipCode"
              label="Zip Code"
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
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
                // required
                error={!!errors.department}
                helperText={errors.department}
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
