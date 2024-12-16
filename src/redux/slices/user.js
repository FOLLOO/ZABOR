import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../r-axios/axios'

export const getUserData = createAsyncThunk('user/getUser', async (id) => {
  try {
    const response = await axios.get('/user/getUser',  {
      params: {
        userId: id
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const postUserPassword = createAsyncThunk('user/updatePassword', async (data) => {
  try{
    const response = await axios.put('/user/updatePassword', data);
    return response.data;
  }catch(error){
    throw error.response.data;
  }
})


export const postUserAvatar = createAsyncThunk('user/takeAvatar', async (data) => {
  try {
    const response = await axios.post('/user/takeAvatar',  data, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const postUserCover = createAsyncThunk('user/takeCover', async (data) => {
  try {
    const response = await axios.post('/user/takeCover',  data, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});


export const getUserAvatar = createAsyncThunk('user/getAvatar', async () => {
  try {
    const response = await axios.get('/user/getAvatar');
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});



const initialState = {
  userData:{
    items: [],
    avatar: 'url',
    status: 'loading',
  }
}



const userSlice = createSlice({
  name: 'userR',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.userData.items = []
        state.userData.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData.items = action.payload;
        state.userData.status = 'loaded';
      })
      .addCase(getUserData.rejected, (state) => {
        state.userData.items = []
        state.userData.status = 'error';
      })
  }
})

export const userReducer = userSlice.reducer;
