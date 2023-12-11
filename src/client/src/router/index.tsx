

import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorBoundary from "../components/ErrorBoundary";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import Contacts from "../pages/Contacts";
import Email from "../pages/Email";
import Inbox from "../pages/Inbox";
import Settings from "../pages/Settings";
import ContactLists from "../pages/ContactLists";
import TextMessage from "../pages/TextMessage";
import PhoneCall from "../pages/PhoneCall";
import AboutUs from "../pages/AboutUs";



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
            path: "/about",
            element: <AboutUs />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoutes />,
      errorElement:<ErrorBoundary />,
      children: [
        {
			path: "/",
			element: <MainLayout />,
			errorElement:<ErrorBoundary />,
			children: [
				{
					path: "/dashboard",
					element: <Dashboard />,
				},
				{
					path: "/contacts",
					element: <Contacts />,
				},
        {
					path: "/contact-lists",
					element: <ContactLists />,
				},
				{
					path: "/email",
					element: <Email />,
				},
        {
					path: "/text",
					element: <TextMessage />,
				},
        {
					path: "/call",
					element: <PhoneCall />,
				},
				{
					path: "/inbox",
					element: <Inbox />,
				},
				{
					path: "/settings",
					element: <Settings />,
				},
			],
        },
      ],
    },
  ]);