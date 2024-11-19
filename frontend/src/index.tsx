import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';



const router = createBrowserRouter([
  {
    path: "/registration",
    element: <RegistrationPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
