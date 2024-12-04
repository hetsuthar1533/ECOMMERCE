import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllProductsByFilter } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
};

// Define the async thunk for fetching products
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchAllProductsByFilterAsync',
  async (filter) => {
    const response = await fetchAllProductsByFilter(filter);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      // Increment value by 1
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the async thunk
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state of the async thunk
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Assign action payload to state.products
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state of the async thunk
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Assign action payload to state.products
        state.products = action.payload;
      });
  },
});

// Export the increment action
export const { increment } = productSlice.actions;

// Selector to get all products from the state
export const selectAllProducts = (state) => state.product.products;

// Export the reducer
export default productSlice.reducer;
