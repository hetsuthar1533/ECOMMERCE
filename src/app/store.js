import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product-list/productSlice';
import cartReducer from '../features/cart/cartSlice';


export const store = configureStore({
   reducer: { product: productReducer,
               cart: cartReducer },
               });
