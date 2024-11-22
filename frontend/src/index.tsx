import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import RegistrationPage from './layout/RegistrationPage';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import Dashboard from './components/Dashboard';
import Layout from './layout/Layout';



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
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
