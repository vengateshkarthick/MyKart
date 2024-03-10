import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IProductData } from "../shared/list.type";

//TODO: need to remove structuredClone if deepCopy works fine

export const productStore = createSlice({
  name: "prodcutStore",
  initialState: {
    product: [] as Array<IProductData>,
    selctedProduct: {},
  },
  reducers: {
    setInitialProductList: (state, action) => {
      state.product = [...action.payload];
    },
    addProduct: (state, action) => {
      state.product.push(action.payload as IProductData);
    },
    updateProduct: (state, action) => {
      const { id, ...rest }: IProductData = action.payload;
      const idx = state.product.findIndex((pdt) => pdt.id == id);
      state.product[idx] = { ...rest, id };
      const updated_product = structuredClone(state.product);
      state.product = updated_product;
    },
    deleteProduct: (state, action) => {
      const { product: oldProduct } = state;
      state.product = structuredClone(
        oldProduct.filter((pdt) =>
          (action.payload as Array<string>).includes(pdt.id)
        )
      );
    },

    fetchProductDetails: (state, action) => {
      const pdt = state.product.find((prd) => prd.id === action.payload.id);
      if (pdt) state.selctedProduct = pdt;
      else state.selctedProduct = {};
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setInitialProductList,
  fetchProductDetails,
} = productStore.actions;