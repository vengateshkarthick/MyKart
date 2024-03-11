import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductList from "./views/ProductList";
import CreateOrEditProduct from "./views/ProductForm";
import { setInitialProductList } from "./reducer/store";
import { getApiData } from "./views/ProductList/helper";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const  product = useSelector((state:any) => state?.prodcuts?.product)
  // updating store with local json data
  React.useEffect(() => {
    if (dispatch && !product.length) {
      dispatch(setInitialProductList(getApiData()));
    }
  }, [dispatch, product])
  return (
    <div className="h-full w-full flex flex-col gap-3 justify-start items-center flex-1">
      <Header />
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
