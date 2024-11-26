import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import HomePage from './layout/HomePage';
import Layout from './layout/Layout';
import LoginPage from './layout/LoginPage';
import RegistrationPage from './layout/RegistrationPage';
import TravelMap from './components/TravelMap';

 export const googleAPIKey = 'AIzaSyBlF7YCQMhpBMZyPjGIntok5Ksw-zrVg44'

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
    element:<Layout/>,
  },
  {
    path: "/map",
    element: <TravelMap />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
