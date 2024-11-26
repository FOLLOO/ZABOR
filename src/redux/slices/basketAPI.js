import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBasket = createAsyncThunk(
    'publication/getBasket',
    async () => {
        try {
            const response = await axios.get(`/publication/getBasket` );
            return response.data; // Возвращаем данные из ответа
        } catch (error) {
            throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
        }
    }
);

export const addPostToBasket = createAsyncThunk('publication/putPublicationInBasket',
    async (data) => {
        try {
            const response = await axios.post('/publication/putPublicationInBasket',  data);
            return response.data; // Возвращаем данные из ответа
        } catch (error) {
            throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
        }
    });

export const deleteItemFromBasket = createAsyncThunk('publication/deleteBasketItem',
    async (data) => {
        try {
            const response = await axios.delete('/publication/deleteBasketItem', {data: data});
            return response.data; // Возвращаем данные из ответа
        } catch (error) {
            throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
        }
    });


const basketAPISlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'loading',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBasket.pending, (state) => {
                state.cart.items = []; // Устанавливаем массив пустым при загрузке
                state.cart.status = 'loading';
            })
            .addCase(getBasket.fulfilled, (state, action) => {
                state.cart.items = action.payload; // Заполняем корзину полученными данными
                state.cart.status = 'loaded';
            })
            .addCase(getBasket.rejected, (state, action) => {
                state.cart.error = action.error.message;
                state.cart.status = 'error';
            })
            .addCase(addPostToBasket.fulfilled, (state, action) => {
                state.cart.items.push(action.payload);
            })
            .addCase(deleteItemFromBasket.fulfilled, (state, action) => {
                state.cart.items = state.items.filter(item => item.id !== action.payload.id);
            });
    },
});

export default basketAPISlice.reducer;

