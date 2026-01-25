import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import ClientDashboard from "./components/ClientDashboard";
import FreelancerDashboard from "./components/FreelancerDashboard";
import JobForm from "./components/JobForm";
import ApplicationForm from "./components/ApplicationForm";
import MyApplications from "./components/MyApplications";
import ClientApplications from "./components/ClientApplications";

export default function Root() {
// const user = JSON.parse(localStorage.getItem("user"));
// const isClient = user?.role === "client";
// const isFreelancer = user?.role === "freelancer";
   

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "client-dashboard", element: <ClientDashboard /> },
      { path: "freelancer-dashboard", element: <FreelancerDashboard /> },
      { path: "create-job", element: <JobForm /> },
      { path: "apply/:jobId", element: <ApplicationForm /> },
      {
        path: "my-applications",  element:<MyApplications />
      },
      {path:"client",element:<ClientApplications/>},
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);


  return <RouterProvider router={router} />;
}
