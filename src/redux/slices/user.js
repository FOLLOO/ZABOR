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

// export const fetchRegistration = createAsyncThunk('auth/registration', async (regData) => {
//   const {data} = await axios.post('/auth/registration', regData)
//     .catch(error => {
//       throw error.response.data
//     })
//   return data
// })
//
// export const fetchAuth = createAsyncThunk('auth/login/access-token', async (token) => {
//   const {data} = await axios.get(`/auth/login/access-token`)
//   return data
// })
//
//
//
const initialState = {
  userData:{
    items: [],
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
  }
})
//
// export const SelectIsAuth = state => Boolean(state.auth.data);
// export const selectAuthData = state => state.auth?.data;
//
export const userReducer = userSlice.reducer;
//
// export const { logout } = authSlince.actions