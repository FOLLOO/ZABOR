import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClassic as axios } from '../../r-axios/axios'
// import { deltePost, getUserPost } from './post'

export const createFolder = createAsyncThunk('publication/createFolder', async (data) => {
  try {
    const response = await axios.post('/publication/createFolder', data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getUserFolder = createAsyncThunk('publication/getUserFolders', async (id) => {
  try {
    const response = await axios.get('/publication/getUserFolders',  {
      params: {
        userId: id
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const putFolder = createAsyncThunk('publication/editFolder',
    async (data) => {
  try {
    const response = await axios.put('/publication/editFolder',  data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const putPublicationToFolder = createAsyncThunk('publication/putPublicationInFolder',
    async (data) => {
      try {
        const response = await axios.post('/publication/putPublicationInFolder',  data);
        return response.data; // Возвращаем данные из ответа
      } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
      }
    });

export const deletePublicationFromFolder = createAsyncThunk(
    'publication/deletePublicationInFolder',
    async (data) => {
      try {
        const response = await axios.delete(`/publication/deletePublicationInFolder`, { data });
        return response.data; // Возвращаем данные из ответа
      } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
      }
    }
);
export const deleteFolder = createAsyncThunk(
    'publication/deleteFolder',
    async (data) => {
  try {
    const response = await axios.delete(`/publication/deleteFolder/`, {data});
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

export const getPublicationsInFolder = createAsyncThunk('publication/getPublicationsInFolder', async (id) => {
  try {
    const response = await axios.get('/publication/getPublicationsInFolder',  {
      params: {
        folderId: id
      }
    });
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});

const initialState = {
  userFolder:{
    items: [],
    status: 'loading',
  },
  dataInFolder: {
    items: [],
    status: 'loading',
  }
}

const userFolderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFolder.pending, (state) => {
        state.userFolder.items = [];
        state.userFolder.status = 'loading';
      })
      .addCase(getUserFolder.fulfilled, (state, action) => {
        state.userFolder.items = action.payload;
        state.userFolder.status = 'loaded';
      })
      .addCase(getUserFolder.rejected, (state) => {
        state.userFolder.items = [];
        state.userFolder.status = 'error';
      })
      .addCase(getPublicationsInFolder.pending, (state) => {
        state.dataInFolder.items = [];
        state.dataInFolder.status = 'loading';
      })
      .addCase(getPublicationsInFolder.fulfilled, (state, action) => {
        state.dataInFolder.items = action.payload;
        state.dataInFolder.status = 'loaded';
      })
      .addCase(getPublicationsInFolder.rejected, (state) => {
        state.dataInFolder.items = [];
        state.dataInFolder.status = 'error';
      })
  }
});

export const userFolderReducer = userFolderSlice.reducer;