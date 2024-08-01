import { configureStore } from '@reduxjs/toolkit'
import { userPostsReducer } from './slices/post'
import { tagsReducer } from './slices/tag'
import { userFolderReducer } from './slices/folder'
import cartSlice from './slices/bascet'
import { userReducer } from './slices/user'
import { notificationReducer } from './slices/notifications'
import { subscribeReducer } from './slices/sub'

const store = configureStore({
  reducer: {
    posts: userPostsReducer,
    allTags: tagsReducer,
    folder: userFolderReducer,
    userR: userReducer,
    noti: notificationReducer,
    subscribes: subscribeReducer,
    cart: cartSlice,
  }
});

export default store