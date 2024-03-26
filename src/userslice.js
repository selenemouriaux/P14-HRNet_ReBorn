import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      firstName: null,
      lastName: null,
      startDate: null,
      department: null,
      dateOfBirth: null,
      street: null,
      city: null,
      state: null,
      zipCode: null,
    },
  },
  reducers: {
    setUserFisrtName: (state, action) => {
      state.userInfo.firstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.userInfo.lastName = action.payload;
    },
    setUserStartDate: (state, action) => {
      state.userInfo.startDate = action.payload;
    },
    setUserDepartment: (state, action) => {
      state.userInfo.department = action.payload;
    },
    setUserDateOfBirth: (state, action) => {
      state.userInfo.dateOfBirth = action.payload;
    },
    setUserStreet: (state, action) => {
      state.userInfo.street = action.payload;
    },
    setUserCity: (state, action) => {
      state.userInfo.city = action.payload;
    },
    setUserState: (state, action) => {
      state.userInfo.state = action.payload;
    },
    setUserZipCode: (state, action) => {
      state.userInfo.zipCode = action.payload;
    },
  },
});

export const reducer = userSlice.reducer;
export const {
  setUserFisrtName,
  setUserLastName,
  setUserStartDate,
  setUserDepartment,
  setUserDateOfBirth,
  setUserStreet,
  setUserCity,
  setUserZipCode,
} = userSlice.actions;
