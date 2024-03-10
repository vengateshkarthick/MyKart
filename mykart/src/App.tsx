import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductList from "./views/ProductList";
import CreateOrEditProduct from "./views/ProductForm";

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
        element: <CreateOrEditProduct />,
      },
    ],
  },
]);

export default function () {
  return <RouterProvider router={routes} />;
}
