import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../r-axios/axios'

export const getNotifications = createAsyncThunk('user/getNotifications', async () => {
    try {
        const response = await axios.get('user/getNotifications', );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});

export const readAll = createAsyncThunk('notification/setRead', async () => {
    try {
        const response = await axios.post('notification/setRead', );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});

export const postLikePublication = createAsyncThunk('publication/likePublication', async (data) => {
    try {
        const response = await axios.post('/publication/likePublication', data);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});

export const postToFavorite = createAsyncThunk('publication/addToFavorites', async (data) => {
    try {
        const response = await axios.post('/publication/addToFavorites', data);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
})


export const toggleNoti = createAsyncThunk('user/toggleNotifications', async (data) => {
    try {
        const response = await axios.post('user/toggleNotifications', data );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});


const initialState = {
    notification:{
        items: [],
        status: 'loading',
    }
}

const notificationsSlince = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.notification.items = [];
                state.notification.status = 'loading';
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notification.items = action.payload;
                state.notification.status = 'loaded';
            })
            .addCase(getNotifications.rejected, (state) => {
                state.notification.items = [];
                state.notification.status = 'error';
            })
    }
});

export const notificationReducer = notificationsSlince.reducer;