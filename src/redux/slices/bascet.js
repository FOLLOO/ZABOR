import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const sendCartData = createAsyncThunk(
  'cart/sendCartData',
  async (cartItems, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/cart', cartItems);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'loading',
    error: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // Другие редьюсеры для управления корзиной
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendCartData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;