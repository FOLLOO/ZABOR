import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {axiosClassic as axios} from '../../r-axios/axios'

export const fetchTags = createAsyncThunk('tag/getTagGroup', async () => {
  try {
    const response = await axios.get('/tag/getTagGroup');
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const fetchCreativeTags = createAsyncThunk('tag/getCreativeTagByGroup', async (data) => {
  try {
    const response = await axios.get('tag/getCreativeTagByGroup', {params: data });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const createUserInterests = createAsyncThunk('user/createUserInterests', async (data) => {
  try {
    const response = await axios.post('/user/createUserInterests', {
      tags: data
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const userInterests = createAsyncThunk('user/getUserInterests', async (data) => {
  try {
    const response = await axios.get('/user/getUserInterests');
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
})


const initialState = {
  tags:{
    items: [],
    status: 'loading',
  },
  creative_tags:{
    items: [],
    status: 'loading',
  },
  userTags:{
    items: {
      groupsIds: [],
      tags: [],
    },
    status: 'loading',
  }
}

const tagSlince = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      })
      .addCase(fetchCreativeTags.pending, (state) => {
        state.creative_tags.items = [];
        state.creative_tags.status = 'loading';
      })
      .addCase(fetchCreativeTags.fulfilled, (state, action) => {
        state.creative_tags.items = action.payload;
        state.creative_tags.status = 'loaded';
      })
      .addCase(fetchCreativeTags.rejected, (state) => {
        state.creative_tags.items = [];
        state.creative_tags.status = 'error';
      })
        .addCase(userInterests.pending, (state) => {
          state.userTags.items = [];
          state.userTags.status = 'loading';
        })
        .addCase(userInterests.fulfilled, (state, action) => {
          state.userTags.items = action.payload;
          state.userTags.status = 'loaded';
        })
        .addCase(userInterests.rejected, (state) => {
          state.userTags.items = [];
          state.userTags.status = 'error';
        })
  }
});

export const tagsReducer = tagSlince.reducer;
