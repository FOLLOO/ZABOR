import { createAsyncThunk } from '@reduxjs/toolkit'
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