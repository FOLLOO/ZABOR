import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../r-axios/axios'

export const getPartnerCard = createAsyncThunk('partner/get', async () => {
    try {
        const response = await axios.get('partner/get', );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});


export const createPartner = createAsyncThunk('partner/add', async (data) => {
    try {
        const response = await axios.post('partner/add', data );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});

export const updatePartner = createAsyncThunk('partner/update', async (data) => {
    try {
        const response = await axios.put('partner/update', data );
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error.response.data; // Если есть ошибка, выбрасываем её для обработки в Redux
    }
});


const initialState = {
    partnerCard:{
        items: [],
        status: 'loading',
    }
}

const partnerCardSlince = createSlice({
    name: 'partnerCard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPartnerCard.pending, (state) => {
                state.partnerCard.items = [];
                state.partnerCard.status = 'loading';
            })
            .addCase(getPartnerCard.fulfilled, (state, action) => {
                state.partnerCard.items = action.payload;
                state.partnerCard.status = 'loaded';
            })
            .addCase(getPartnerCard.rejected, (state) => {
                state.partnerCard.items = [];
                state.partnerCard.status = 'error';
            })
    }
});

export const partnerCardsReducer = partnerCardSlince.reducer;