import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IProductData } from "../shared/list.type";

//TODO: need to remove structuredClone if deepCopy works fine

export const productStore = createSlice({
  name: "prodcutStore",
  initialState: {
    product: [] as Array<IProductData>,
    selectedProduct: new Object() as IProductData,
  },
  reducers: {
    setInitialProductList: (state, action) => {
      state.product = [...action.payload];
    },

    addProduct: (state, action) => {
      console.log(action.payload)
      const newProduct = {...action.payload, id: `ID0${state.product.length + 1}`}
      state.product.push(newProduct);
    },

    updateProduct: (state, action) => {
      const { id, ...rest }: IProductData = action.payload;
      const idx = state.product.findIndex((pdt) => pdt.id == id);
      state.product[idx] = { ...rest, id };
      const updated_product = [...state.product];
      state.product = updated_product;
      state.selectedProduct = new Object() as IProductData;
    },
    deleteProduct: (state, action) => {
      const { product: oldProductId } = state;
      state.product = [...oldProductId.filter((item) => !action.payload.includes(item.id))];

    },

    fetchProductDetails: (state, action) => {
      const pdt = state.product.findIndex((prd) => prd.id === action.payload)
      console.log(pdt, action.payload)
      if (pdt !== -1) state.selectedProduct = state.product[pdt];
      else state.selectedProduct = {} as IProductData;
      
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