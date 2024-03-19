import { Navigate, createBrowserRouter } from "react-router-dom"
import CreateEmployee from "./components/CreateEmployee"
import EmployeesList from "./pages/EmployeesList"
import Error from "./pages/Error"
import Home from "./pages/Home"

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
