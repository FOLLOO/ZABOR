import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosClassic as axios} from '../../r-axios/axios'
// // import axios from "axios";

// export const getUserData = createAsyncThunk('user/getUser', async (param) => {
//   const response = await axios.get('/user/getUser', param)
//     .catch(error => {
//       throw error.response.data
//     })
//   return response
// })

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

export const getUserCover = createAsyncThunk('user/getProfileCover', async () => {
  try {
    const response = await axios.get('/user/getProfileCover');
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
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(getUserData.rejected, (state) => {
        state.userData.items = []
        state.status = 'error';
      })
      // .addCase(getUserAvatar.pending, (state) => {
      //   state.userData.avatar = 'not'
      //   state.status = 'loading';
      // })
      // .addCase(getUserAvatar.fulfilled, (state, action) => {
      //   state.userData.avatar = action.payload;
      //   state.status = 'loaded';
      // })
      // .addCase(getUserAvatar.rejected, (state) => {
      //   state.userData.avatar = 'err'
      //   state.status = 'error';
      // })
        // .addCase(getUserCover.pending, (state) => {
        //   state.userData.avatar = 'not'
        //   state.status = 'loading';
        // })
        // .addCase(getUserCover.fulfilled, (state, action) => {
        //   state.userData.avatar = action.payload;
        //   state.status = 'loaded';
        // })
        // .addCase(getUserCover.rejected, (state) => {
        //   state.userData.avatar = 'err'
        //   state.status = 'error';
        // })
  }
})
//
// export const SelectIsAuth = state => Boolean(state.auth.data);
// export const selectAuthData = state => state.auth?.data;
//
export const userReducer = userSlice.reducer;
//
// export const { logout } = authSlince.actions