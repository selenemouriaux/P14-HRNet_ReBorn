import { createSlice } from "@reduxjs/toolkit"
import { users } from "./assets/lists.json"

const getEmployeesListFromLocalStorage = () => {
  const employeesListFromStorage = JSON.parse(
    localStorage.getItem("employeesList")
  )
  return employeesListFromStorage ?? users
}

const initialStateOfEmployeesList = {
  employeesList: getEmployeesListFromLocalStorage(),
}

const employeesSlice = createSlice({
  name: "employees",
  initialState: initialStateOfEmployeesList,
  reducers: {
    addEmployee: (state, action) => {
      state.employeesList.push(action.payload)
      localStorage.setItem("employeesList", JSON.stringify(state.employeesList))
    },
    // ADD REDUCERS TO SORT AND GET SPECIFIC USERS AS SETS OF PAGES
  },
})

export const reducer = employeesSlice.reducer
export const { addEmployee } = employeesSlice.actions
