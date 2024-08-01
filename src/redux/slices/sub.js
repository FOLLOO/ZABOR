import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClassic as axios } from '../../r-axios/axios'
import { getNotifications } from './notifications'

export const postSubscribe = createAsyncThunk('user/subscribe', async (data) => {
  try {
    const response = await axios.post('/user/subscribe', data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getSubscribe = createAsyncThunk('user/getMySubscriptions', async () => {
  try {
    const response = await axios.get('/user/getMySubscriptions');
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

const initialState = {
  sub:{
    items: [],
    status: 'loading',
  }
}

const subscribeSlince = createSlice({
  name: 'sub',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribe.pending, (state) => {
        state.sub.items = [];
        state.sub.status = 'loading';
      })
      .addCase(getSubscribe.fulfilled, (state, action) => {
        state.sub.items = action.payload;
        state.sub.status = 'loaded';
      })
      .addCase(getSubscribe.rejected, (state) => {
        state.sub.items = [];
        state.sub.status = 'error';
      })
  }
});

export const subscribeReducer = subscribeSlince.reducer;
