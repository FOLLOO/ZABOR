// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// // import axios from "axios";
// import {axiosClassic as axios} from '../../r-axios/axios'
//
// export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
//   const { data } = await axios.post('/auth/login', loginData)
//     .catch(error => {
//       throw error.response.data
//     })
//   return data
// })
//
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
// const initialState = {
//   data: null,
//   status: 'loading',
// }
//
//
//
// const authSlince = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.data = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLogin.pending, (state) => {
//         state.status = 'loading';
//         state.data = null
//       })
//       .addCase(fetchLogin.fulfilled, (state, action) => {
//         state.status = 'loaded';
//         state.data = action.payload;
//       })
//       .addCase(fetchLogin.rejected, (state) => {
//         state.status = 'error';
//         state.data = null
//       })
//       .addCase(fetchAuth.pending, (state) => {
//         state.status = 'loading';
//         state.data = null
//       })
//       .addCase(fetchAuth.fulfilled, (state, action) => {
//         state.status = 'loaded';
//         state.data = action.payload;
//       })
//       .addCase(fetchAuth.rejected, (state) => {
//         state.status = 'error';
//         state.data = null
//       })
//       .addCase(fetchRegistration.pending, (state) => {
//         state.status = 'loading';
//         state.data = null
//       })
//       .addCase(fetchRegistration.fulfilled, (state, action) => {
//         state.status = 'loaded';
//         state.data = action.payload;
//       })
//       .addCase(fetchRegistration.rejected, (state) => {
//         state.status = 'error';
//         state.data = null
//       })
//
//   }
// })
//
// export const SelectIsAuth = state => Boolean(state.auth.data);
// export const selectAuthData = state => state.auth?.data;
//
// export const authReducer = authSlince.reducer;
//
// export const { logout } = authSlince.actions