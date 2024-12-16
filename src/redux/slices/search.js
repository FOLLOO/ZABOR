import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../r-axios/axios'

export const searchData = createAsyncThunk('search', async (text) => {
    try {
        const response = await axios.get('/search', {
            params: { text: text },  // Параметры передаются через 'params'
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});

const initialState = {
    searchData:{
        items: {
            publications: [],
            folders: [],
            users: [],
        },
        status: 'loading',
    },
}

const searchSlice = createSlice({
    name: 'searchData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchData.pending, (state) => {
                state.searchData.items = {
                    publications: [],
                    folders: [],
                    users: [],
                };
                state.searchData.status = 'loading';
            })
            .addCase(searchData.fulfilled, (state, action) => {
                state.searchData.items = action.payload;
                state.searchData.status = 'loaded';
            })
            .addCase(searchData.rejected, (state) => {
                state.searchData.items = {
                    publications: [],
                    folders: [],
                    users: [],
                };
                state.searchData.status = 'error';
            })
    }
});

export const searchReducer = searchSlice.reducer;