import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductList from "./views/ProductList";

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
        path: "home",
        element: <ProductList />,
      },
      {
        path: "form/:id",
        element: <div>Form</div>,
      },
    ],
  },
]);

export default function () {
  return <RouterProvider router={routes} />;
}
