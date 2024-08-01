import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClassic as axios } from '../../r-axios/axios'
import { fetchCreativeTags, fetchTags } from './tag'

export const getNotifications = createAsyncThunk('user/getNotifications', async () => {
  try {
    const response = await axios.get('user/getNotifications', );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});


const initialState = {
  notification:{
    items: [],
    status: 'loading',
  }
}

const notificationsSlince = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.notification.items = [];
        state.notification.status = 'loading';
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notification.items = action.payload;
        state.notification.status = 'loaded';
      })
      .addCase(getNotifications.rejected, (state) => {
        state.notification.items = [];
        state.notification.status = 'error';
      })
  }
});

export const notificationReducer = notificationsSlince.reducer;