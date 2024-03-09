import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <div className="h-full w-full">
      <Outlet />
      <ToastContainer />
    </div>
  );
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <div>Product List</div>,
      },
      {
        path: "/:id",
        element: <div>Form</div>,
      },
    ],
  },
]);

export default function () {
  return <RouterProvider router={routes} />;
}
