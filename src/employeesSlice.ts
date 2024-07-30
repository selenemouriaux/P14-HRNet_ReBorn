import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { users } from "./assets/lists.json"
import {
  SivTableData,
  SivTableState,
} from "./components/CustomTableComponent/types"

/**
 * @function getParsedLocalStorageItem
 * @description replaceable with any another way of fetching initial data, localStorage is used by default
 * @param key localstorage key
 * @returns localstorage value of key or fallback value, can be swapped for null
 */
function getParsedLocalStorageItem(key: string) {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : users
}

const getData = (): SivTableData[] => getParsedLocalStorageItem("employeesList")

const initialData: SivTableState = {
  employeesList: getData(),
}

const employeesSlice = createSlice({
  name: "employees",
  initialState: initialData,
  reducers: {
    addEmployee: (state, action: PayloadAction<SivTableData>) => {
      state.employeesList.push(action.payload)
      localStorage.setItem("employeesList", JSON.stringify(state.employeesList))
    },
    // ADD REDUCERS TO SORT AND GET SPECIFIC USERS AS SETS OF PAGES
  },
})

export const reducer = employeesSlice.reducer
export const { addEmployee } = employeesSlice.actions
