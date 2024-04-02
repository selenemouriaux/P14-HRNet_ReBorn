import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./employeesSlice"

const store = configureStore({
  reducer: reducer,
})

export default store
