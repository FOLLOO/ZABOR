import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import axios from "axios";
import axios from '../../r-axios/axios'

export const fetchPosts = createAsyncThunk('publication/getMainPublications', async (params) => {
  try {
    const response = await axios.get('/publication/getMainPublications', {
      params: {
        group: params.group, // Пример значения для group, замените на нужное вам
        creative_tags: params.creative_tags // Пример значения для creative_tags, замените на нужное вам
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const createPost = createAsyncThunk('publication/createPublication', async (data) => {
  try {
    const response = await axios.post('/publication/createPublication', data, { headers: {
        'content-type': 'multipart/form-data',
      }});
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const updatePost = createAsyncThunk('publication/editPublication/', async ({id, formData}) => {
  try {
    const response = await axios.put(`/publication/editPublication/${id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      }});
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const reportPublication = createAsyncThunk('publication/reportPublication', async (data) => {
  try {
    const response = await axios.post('/publication/reportPublication', data );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
})

export const getUserPost = createAsyncThunk('publication/getUserPublications', async (id) => {
  try {
    const response = await axios.get('/publication/getUserPublications', {
      params:{
        userId: id
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const deltePost = createAsyncThunk('publication/deletePublication', async (id) => {
  try {
    const response = await axios.put('/publication/deletePublication', {
        publicationId: id
    },
      { withCredentials: true }
    );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getPost = createAsyncThunk('publication/getPublication', async (id) => {
  try {
    const response = await axios.get(`/publication/getPublication/${id}`);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getSamePost = createAsyncThunk('publication/getSimilarPublications', async (id) => {
  try {
    const response = await axios.get(`/publication/getSimilarPublications/${id}`);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});


const initialState = {
  userPosts:{
    items: [],
    status: 'loading',
  },
  OnePost:{
    items: [],
    status: 'loading'
  },
  SamePosts: {
    items: [],
    status: 'loading'
  }
}

const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPost.pending, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = 'loading';
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.userPosts.items = action.payload;
        state.userPosts.status = 'loaded';
      })
      .addCase(getUserPost.rejected, (state) => {
        state.userPosts.items = [];
        state.userPosts.status = 'error';
      })
      .addCase(deltePost.pending, (state, action) => {
        state.userPosts.items = state.userPosts.items.filter(obj => obj.id === action.payload);
      })
      .addCase(getPost.pending, (state) => {
        state.OnePost.items = [];
        state.OnePost.status = 'loading';
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.OnePost.items = action.payload;
        state.OnePost.status = 'loaded';
      })
      .addCase(getPost.rejected, (state) => {
        state.OnePost.items = [];
        state.OnePost.status = 'error';
      })
      .addCase(getSamePost.pending, (state) => {
        state.SamePosts.items = [];
        state.SamePosts.status = 'loading';
      })
      .addCase(getSamePost.fulfilled, (state, action) => {
        state.SamePosts.items = action.payload;
        state.SamePosts.status = 'loaded';
      })
      .addCase(getSamePost.rejected, (state) => {
        state.SamePosts.items = [];
        state.SamePosts.status = 'error';
      })
  }
});

export const userPostsReducer = userPostsSlice.reducer;