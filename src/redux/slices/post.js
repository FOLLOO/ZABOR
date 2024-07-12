import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import axios from "axios";
import { axiosClassic as axios } from '../../r-axios/axios'


export const fetchPosts = createAsyncThunk('publication/getMainPublications', async (params) => {
  try {
    const response = await axios.get('/publication/getMainPublications', {
      params: {
        group: 'main', // Пример значения для group, замените на нужное вам
        creative_tags: [1, 2] // Пример значения для creative_tags, замените на нужное вам
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

// export const fetchRegistration = createAsyncThunk('auth/registration', async (regData) => {
//  const {data} = await axios.post('/auth/registration', regData)
//    .catch(error => {
//     throw error.response.data
//    })
//  return data
// })
//
// export const fetchAuth = createAsyncThunk('auth/check/token', async (token) => {
//  const {data} = await axios.get(`/auth/login/access-token`)
//  return data
// })
//
//
//
// const initialState = {
//  data: null,
//  status: 'loading',
// }
//
//
//
// const authSlince = createSlice({
//  name: 'auth',
//  initialState,
//  reducers: {
//   logout: (state) => {
//    state.data = null;
//   }
//  },
//  extraReducers: (builder) => {
//   builder
//     .addCase(fetchAuth.pending, (state) => {
//      state.status = 'loading';
//      state.data = null
//     })
//     .addCase(fetchAuth.fulfilled, (state, action) => {
//      state.status = 'loaded';
//      state.data = action.payload;
//     })
//     .addCase(fetchAuth.rejected, (state) => {
//      state.status = 'error';
//      state.data = null
//     })
//     // .addCase(fetchAuthMe.pending, (state) => {
//     //   state.status = 'loading';
//     //   state.data = null
//     // })
//     // .addCase(fetchAuthMe.fulfilled, (state, action) => {
//     //   state.status = 'loaded';
//     //   state.data = action.payload;
//     // })
//     // .addCase(fetchAuthMe.rejected, (state) => {
//     //   state.status = 'error';
//     //   state.data = null
//     // })
//     .addCase(fetchRegistration.pending, (state) => {
//      state.status = 'loading';
//      state.data = null
//     })
//     .addCase(fetchRegistration.fulfilled, (state, action) => {
//      state.status = 'loaded';
//      state.data = action.payload;
//     })
//     .addCase(fetchRegistration.rejected, (state) => {
//      state.status = 'error';
//      state.data = null
//     })
//
//  }
// })
//
// export const SelectIsAuth = state => Boolean(state.auth.data);
//
// export const authReducer = authSlince.reducer;
//
// export const { logout } = authSlince.actions