import { configureStore } from "@reduxjs/toolkit";
import { productStore } from "./store";

export default configureStore({
    reducer: {
      prodcuts: productStore.reducer,
    },
  });
  