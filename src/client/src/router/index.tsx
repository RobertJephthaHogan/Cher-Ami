

import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorBoundary from "../components/ErrorBoundary";
import Dashboard from "../pages/Dashboard";



export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorBoundary />,
      children: [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
      },
      ],
    },
  ]);