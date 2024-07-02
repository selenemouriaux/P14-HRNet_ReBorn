import { Navigate, createBrowserRouter } from "react-router-dom"
import CreateEmployee from "./components/CreateEmployee"
import EmployeesList from "./components/EmpoyeeList"
import Error from "./components/Error"
import Home from "./components/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/employee-list" />,
      },
      { path: "/employee-list", element: <EmployeesList /> },
      { path: "/employee-add", element: <CreateEmployee /> },
    ],
  },
])
