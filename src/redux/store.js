import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/user'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store