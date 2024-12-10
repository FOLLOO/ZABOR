import { configureStore } from '@reduxjs/toolkit'
import { userPostsReducer } from './slices/post'
import { tagsReducer } from './slices/tag'
import { userFolderReducer } from './slices/folder'
// import cartSlice from './slices/bascet'
import { userReducer } from './slices/user'
import { notificationReducer } from './slices/notifications'
import { subscribeReducer } from './slices/sub'
import {basketAPIReducer} from "./slices/basketAPI";
import {commentsReducer} from "./slices/comments";
import {searchReducer} from "./slices/search";

const store = configureStore({
  reducer: {
    posts: userPostsReducer,
    allTags: tagsReducer,
    folder: userFolderReducer,
    userR: userReducer,
    noti: notificationReducer,
    subscribes: subscribeReducer,
    cart: basketAPIReducer,
    comments: commentsReducer,
    search: searchReducer,
  }
});

export default store