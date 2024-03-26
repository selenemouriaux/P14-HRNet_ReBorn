import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { departments, states } from "../../assets/lists.json";

import styles from "./styles";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmployee(null);
  };
  return (
    <Stack sx={styles}>
      <Typography variant="h2">Create Employee</Typography>
      <Box className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            className="expansible50"
            required
            id="firstName"
            label="First Name"
            value={employee.firstName}
          />
          <TextField
            className="expansible50"
            required
            id="lastName"
            label="Last Name"
            value={employee.lastName}
          />
          <Box className="datePickerBox">
            <InputLabel className="form-label collapsible30">
              Date of Birth :
            </InputLabel>
            <DatePicker className="collapsible70" defaultValue={new Date()} />
          </Box>
          <Box component="fieldset" className="subCategoryFields">
            <legend>
              <Typography className="form-label">Address</Typography>
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
          <Box className="datePickerBox">
            <InputLabel className="form-label collapsible30">
              Start Date :
            </InputLabel>
            <DatePicker className="collapsible70" defaultValue={new Date()} />
          </Box>
          <Autocomplete
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
        </form>
      </Box>
      <Button>Save</Button>
    </Stack>
  );
};

export default CreateEmployee;
