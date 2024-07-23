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

export const createPost = createAsyncThunk('publication/createPublication', async (data) => {
  try {
    const response = await axios.post('/publication/createPublication', data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getUserPost = createAsyncThunk('publication/getUserPublications', async (id) => {
  try {
    const response = await axios.get('/publication/getUserPublications', {
      params:{
        userId: id
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const deltePost = createAsyncThunk('publication/deletePublication', async (id) => {
  try {
    const response = await axios.put('/publication/deletePublication', {
        publicationId: id
    },
      { withCredentials: true }
    );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});



// export const fetchCreate = createAsyncThunk()

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
const initialState = {
  userPosts:{
    items: [],
    status: 'loading',
  }
}

const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPost.pending, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = 'loading';
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.userPosts.items = action.payload;
        state.userPosts.status = 'loaded';
      })
      .addCase(getUserPost.rejected, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = 'error';
      })
      .addCase(deltePost.pending, (state, action) => {
        state.userPosts.items = state.userPosts.items.filter(obj => obj.id === action.payload);
      });
  }
});

export const userPostsReducer = userPostsSlice.reducer;