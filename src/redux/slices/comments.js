import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClassic as axios } from '../../r-axios/axios'

export const createComment = createAsyncThunk('comment/commentPublication', async (data) => {
  try {
    const response = await axios.post('/comment/commentPublication', data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
  }
});