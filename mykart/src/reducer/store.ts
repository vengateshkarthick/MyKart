import { configureStore, createSlice } from "@reduxjs/toolkit";
import { actions } from "./actions";
import { IProductData } from "../shared/list.type";

//TODO: need to remove structuredClone if deepCopy works fine

const productStore = createSlice({
  name: "prodcutStore",
  initialState: {
    product: [] as Array<IProductData>,
    selctedProduct: {},
  },
  reducers: {
    [actions.SET_INITAL_STORE]: (state, action) => {
      state.product = action.payload;
    },
    [actions.ADD_PRODUCT]: (state, action) => {
      state.product.push(action.payload as IProductData);
    },
    [actions.EDIT_PRODCUT]: (state, action) => {
      const { id, ...rest }: IProductData = action.payload;
      const idx = state.product.findIndex((pdt) => pdt.id == id);
      state.product[idx] = { ...rest, id };
      const updated_product = structuredClone(state.product);
      state.product = updated_product;
    },
    [actions.DELETE_PRODUCT]: (state, action) => {
      const { product: oldProduct } = state;
      state.product = structuredClone(
        oldProduct.filter((pdt) =>
          (action.payload as Array<string>).includes(pdt.id)
        )
      );
    },

    [actions.SET_SELECTED_PRODUCT]: (state, action) => {
      const pdt = state.product.find((prd) => prd.id === action.payload.id);
      if (pdt) state.selctedProduct = pdt;
      else state.selctedProduct = {};
    },
  },
});

const store = configureStore({
  reducer: {
    prodcuts: productStore.reducer,
  },
});

const {
  ADD_PRODUCT: addProduct,
  UPDATE_PRODUCT: updateProduct,
  DELETE_PRODUCT: deleteProduct,
  SET_INITAL_STORE: setInitalProductList,
  SET_SELECTED_PRODUCT: fetchProductDetails,
} = productStore.actions;

export {
  store,
  addProduct,
  updateProduct,
  deleteProduct,
  setInitalProductList,
  fetchProductDetails,
};
