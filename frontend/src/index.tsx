import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import HomePage from './layout/HomePage';
import LoginPage from './layout/LoginPage';
import RegistrationPage from './layout/RegistrationPage';

import DashboardLayoutBasic from './layout/Layout';
import Wrapper from './components/Wrapper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/registration",
    element: <RegistrationPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/layout",
    element:<DashboardLayoutBasic/>,
  },
  {
    path: "/map",
    element: <Wrapper/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
