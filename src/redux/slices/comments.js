import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../r-axios/axios'

export const createComment = createAsyncThunk('comment/commentPublication', async (data) => {
  try {
    const response = await axios.post('/comment/commentPublication', data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getComments = createAsyncThunk('comment/getComments', async (id) => {
  try {
    const response = await axios.get(`comment/getComments/${id}`);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const reportComment = createAsyncThunk('comment/reportComment', async (data) => {
  try {
    const response = await axios.post('/comment/reportComment', data );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
})


export const likeComment = createAsyncThunk('comment/commentLike', async (id) => {
  try {
    const response = await axios.post('/comment/commentLike', {
      commentId: id,
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
})

export const deleteComment = createAsyncThunk('comment/deleteComment', async (id) => {
  try {
    const response = await axios.delete('/comment/deleteComment', {data: {
        commentId: id,
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
})


const initialState = {
  publicationComment:{
    items: [],
    status: 'loading',
  },
}

const commentSlice = createSlice({
  name: 'publicationComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getComments.pending, (state) => {
          state.publicationComment.items = [];
          state.publicationComment.status = 'loading';
        })
        .addCase(getComments.fulfilled, (state, action) => {
          state.publicationComment.items = action.payload;
          state.publicationComment.status = 'loaded';
        })
        .addCase(getComments.rejected, (state) => {
          state.publicationComment.items = [];
          state.publicationComment.status = 'error';
        })
        .addCase(createComment.fulfilled, (state, action) => {
          // Добавляем новый комментарий в начало массива (или в конец, если нужно)
          state.publicationComment.items.unshift({
            ...action.payload,
            replies: []  // Если нужно, можно инициализировать поле "replies" пустым массивом
          });
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
          // action.payload предполагается, что содержит ID удаленного комментария
          state.publicationComment.items = state.publicationComment.items.filter(
              (comment) => comment.id !== action.payload.id // Удаляем комментарий по ID
          );
          state.publicationComment.status = 'updated';
        });
  }
});

export const commentsReducer = commentSlice.reducer;