import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClassic as axios } from '../../r-axios/axios'


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
    async (id) => {
        try {
            const response = await axios.post('/publication/putPublicationInBasket', {
                publicationId: id,
            });
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

const initialState = {
    basket:{
        items: [],
        status: 'loading',
    },
}

const basketAPISlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBasket.pending, (state) => {
                state.basket.items = []; // Устанавливаем массив пустым при загрузке
                state.basket.status = 'loading';
            })
            .addCase(getBasket.fulfilled, (state, action) => {
                state.basket.items = action.payload; // Заполняем корзину полученными данными
                state.basket.status = 'loaded';
            })
            .addCase(getBasket.rejected, (state) => {
                state.basket.items = [];
                state.basket.status = 'error';
            })
            .addCase(addPostToBasket.fulfilled, (state, action) => {
                if(typeof action.payload !== "string") {
                    state.basket.items.push(action.payload);
                }
                })
            .addCase(deleteItemFromBasket.fulfilled, (state, action) => {
                state.basket.items = state.basket.items.filter(item => item.publication.id !== action.payload.id);
            });
    },
});

export  const basketAPIReducer = basketAPISlice.reducer;

