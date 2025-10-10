import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Activities from "../pages/Activities";
import AddActivity from "../pages/AddActivity";
import UpdateActivity from "../pages/UpdateActivity";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      { path: "add-activity", element: <AddActivity /> },
      { path: "activities/edit/:id", element: <UpdateActivity /> },
     
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
