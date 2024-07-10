import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
  const {data} = await axios.post('api/user/login', loginData)
    .catch(error => {
      throw error.response.data
    })
  return data
})

export const fetchRegistration = createAsyncThunk('auth/registration', async (regData) => {
  const {data} = await axios.post('api/user/registration', regData)
    .catch(error => {
      throw error.response.data
    })
  return data
})

export const fetchAuth = createAsyncThunk('auth/check/token', async (token) => {
  const {data} = await axios.get(`api/user/login/access-token`)
  return data
})



const initialState = {
  data: null,
  status: 'loading',
}



const authSlince = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.data = null
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.data = null
      })
      // .addCase(fetchAuthMe.pending, (state) => {
      //   state.status = 'loading';
      //   state.data = null
      // })
      // .addCase(fetchAuthMe.fulfilled, (state, action) => {
      //   state.status = 'loaded';
      //   state.data = action.payload;
      // })
      // .addCase(fetchAuthMe.rejected, (state) => {
      //   state.status = 'error';
      //   state.data = null
      // })
      .addCase(fetchRegistration.pending, (state) => {
        state.status = 'loading';
        state.data = null
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.status = 'error';
        state.data = null
      })

  }
})

export const SelectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlince.reducer;

export const { logout } = authSlince.actions