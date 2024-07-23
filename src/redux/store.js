import { configureStore } from '@reduxjs/toolkit'
import { userPostsReducer } from './slices/post'
import { tagsReducer } from './slices/tag'
import { userFolderReducer } from './slices/folder'

const store = configureStore({
  reducer: {
    posts: userPostsReducer,
    allTags: tagsReducer,
    folder: userFolderReducer,
  }
});

export default store