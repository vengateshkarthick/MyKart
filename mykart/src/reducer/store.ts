import { configureStore, createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';
import { IProductData } from '../shared/list.type';

//TODO: need to remove structuredClone if deepCopy works fine

const productStore = createSlice({
    name: 'prodcutStore',
    initialState: {
        product: [] as Array<IProductData>,
    },
    reducers: {
        [actions.SET_INITAL_STORE]: (state, action) => {
          state.product = action.payload;
        },
        [actions.ADD_PRODUCT]: (state, action) => {
            state.product.push(action.payload as IProductData);
        },
        [actions.EDIT_PRODCUT]: (state, action) => {
           const { id, ...rest } : IProductData = action.payload;
           const idx = state.product.findIndex((pdt) => pdt.id == id);
           state.product[idx] = { ...rest, id };
           const updated_product = structuredClone(state.product);
           state.product = updated_product;
        }, 
        [actions.DELETE_PRODUCT]: (state, action) => {
          const { product:oldProduct } = state;
          state.product = structuredClone(oldProduct.filter((pdt) => (action.payload as Array<string>).includes(pdt.id)));
        }
    }
});

const store = configureStore({
   reducer: {
    prodcuts: productStore.reducer,
   }
});

const { ADD_PRODUCT: addProduct, UPDATE_PRODUCT:updateProduct, DELETE_PRODUCT:deleteProduct, SET_INITAL_STORE: setInitalProductList } = productStore.actions;


export { store, addProduct, updateProduct, deleteProduct, setInitalProductList };

