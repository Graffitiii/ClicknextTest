import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Deposite from './pages/Deposite';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Deposite",
    element: <Deposite/>,
  },
  {
    path: "/Withdraw",
    element: <Withdraw/>,
  },
  {
    path: "/Transfer",
    element: <Transfer/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
